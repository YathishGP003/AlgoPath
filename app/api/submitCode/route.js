import dbConnect from '@/utils/dbConnect';
import {Problem} from "@/models/Problem";
import {User} from "@/models/User";
import {UserInfo} from "@/models/UserInfo.js";
import { mockProblemsData } from '@/constants';

import {SolvedProblem} from "@/models/SolvedProblem";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    if (userID){
        try {
            const {code,problem,language,contest} = await req.json()
        // console.log(code,problem,language,contest)
        const user = await User.findById(userID)
        const userdata = await UserInfo.findById(user.userInfo).populate('solved')
        let prob = await Problem.findOne({id: problem});
        
        // If not found in database, use mock data
        if (!prob) {
            prob = mockProblemsData.find(p => p.id === problem);
            if (!prob) {
                return new Response('Problem not found', {status: 404});
            }
        }
        
        // Only check for existing solved problem if prob is from database (has string _id)
        const existingSolvedProblem = (prob._id && typeof prob._id === 'string') ? 
            userdata.solved.find((solvedProblem) => solvedProblem.problem.equals(prob._id)) : 
            null;
        // console.log('Submitting code for problem:', problem);
        // console.log('Problem found:', prob ? 'Yes' : 'No');
        // console.log('Problem _id type:', typeof prob._id, 'Value:', prob._id);
        // console.log('Is database problem:', prob._id && typeof prob._id === 'string');
        
        const testInput = prob.testCases ? prob.testCases[0].input[0] : (prob.testCase ? prob.testCase.input[0] : '');
        console.log('Test input:', testInput);
        
        // Try JDoodle API first, fallback to mock if it fails
        let res;
        try {
            res = await fetch('https://jdoodle2.p.rapidapi.com/v1',{
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                    "X-RapidAPI-Host": "jdoodle2.p.rapidapi.com",
                },
                body: JSON.stringify({
                    language: language,
                    code: code,
                    input: testInput,
                }),
            });
            
            const result = await res.json();
            if (result.error) {
                throw new Error('JDoodle API error: ' + result.output);
            }
        } catch (jdoodleError) {
            console.log('JDoodle API failed, using mock execution:', jdoodleError.message);
            // Fallback to mock execution
            res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/mock-execute`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    language: language,
                    code: code,
                    input: testInput,
                }),
            });
        }
        
        if (!res.ok) {
            console.error('JDoodle API error:', res.status, res.statusText);
            return new Response('Code execution failed', {status: 500});
        }
        
        const data = await res.json()
        console.log('JDoodle response:', data);
        let tcPass;
        let isAccepted;
        // Handle both database and mock data structures
        const expectedOutput = prob.testCases ? prob.testCases[0].output[0] : (prob.testCase ? prob.testCase.output[0] : '');
        
        if (data.output === expectedOutput){
            tcPass = 1
            isAccepted = "accepted"
        }
        else{
            tcPass = 0
            isAccepted = "rejected"
        }
        const newSolution = {
            contest: contest !== null ? contest : undefined,
            code: code,
            complexity: [data.cpuTime, data.memory],
            status: isAccepted,
            passedTestCases: tcPass
        };
        if (existingSolvedProblem){
            existingSolvedProblem.solution.push(newSolution);
            existingSolvedProblem.save();      
            return new Response(JSON.stringify({isAccepted, output: data.output}),{status: 201})      
        }
        else{
            if ((isAccepted && contest) || !contest){
                // Only save to database if prob has _id (from database, not mock data)
                if (prob._id && typeof prob._id === 'string') {
                    const newSolve = new SolvedProblem(
                        {
                            contest: contest !== null ? contest : undefined,
                            problem: prob._id,
                            solution: [newSolution]
                        }
                    )
                    const newSol = await newSolve.save()
                    userdata.solved.push(newSol.id)
                    userdata.save()
                }
                return new Response(JSON.stringify({isAccepted, output: data.output}),{status: 201})    
            }
            else{
                return new Response('Testcase Failed', {status: 400})
            }
        }
        } catch (error) {
            console.error('Error in submitCode:', error);
            return new Response('Internal server error', {status: 500});
        }
    }
    return new Response('User Not Found',{status: 401})
}