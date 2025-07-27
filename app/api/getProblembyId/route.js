import {Problem} from "@/models/Problem";
import dbConnect from '@/utils/dbConnect';
import { mockProblemsData } from '@/constants';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('id')
    
    try {
        await dbConnect();
        const problem = await Problem.findOne({id: query});
        
        if (problem) {
            return new Response(JSON.stringify(problem), {status: 200});
        }
        
        // If not found in database, search in mock data
        const mockProblem = mockProblemsData.find(p => p.id === query);
        if (mockProblem) {
            return new Response(JSON.stringify(mockProblem), {status: 200});
        }
        
        return new Response(JSON.stringify(null), {status: 404});
    } catch (error) {
        console.error('Database error, searching in mock data:', error);
        // If database connection fails, search in mock data
        const mockProblem = mockProblemsData.find(p => p.id === query);
        if (mockProblem) {
            return new Response(JSON.stringify(mockProblem), {status: 200});
        }
        return new Response(JSON.stringify(null), {status: 404});
    }
}
