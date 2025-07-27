import {Problem} from "@/models/Problem";
import dbConnect from '@/utils/dbConnect';
import { mockProblemsData } from '@/constants';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function GET() {
    try {
        await dbConnect();
        const problems = await Problem.find();
        
        // If no problems in database, return mock data
        if (problems.length === 0) {
            console.log('No problems in database, returning mock data');
            return new Response(JSON.stringify(mockProblemsData), {status: 200});
        }
        
        return new Response(JSON.stringify(problems), {status: 200});
    } catch (error) {
        console.error('Database error, returning mock data:', error);
        // If database connection fails, return mock data
        return new Response(JSON.stringify(mockProblemsData), {status: 200});
    }
}
