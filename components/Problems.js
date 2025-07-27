
'use client'
import React, { useEffect, useState } from 'react';
import { AiOutlineSolution } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { mockProblemsData } from '@/constants';

const Problems = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [problems, setProblems] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [solvedProblems, setSolvedProblems] = useState(new Set());


    // Fetch user info and solved problems
    const fetchUserInfo = async () => {
        if (status === 'authenticated') {
            try {
                const response = await fetch('/api/getUserInfo');
                if (response.ok) {
                    const userData = await response.json();
                    setUserInfo(userData);
                    
                    // Create a Set of solved problem IDs for quick lookup
                    const solvedIds = new Set();
                    if (userData.solved && userData.solved.length > 0) {
                        userData.solved.forEach(solvedProblem => {
                            if (solvedProblem.problem) {
                                solvedIds.add(solvedProblem.problem.toString());
                            }
                        });
                    }
                    setSolvedProblems(solvedIds);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }
    };

    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/getAllProblems');
            const data = await response.json();
            setProblems(data);
        }
        fetchProblems();
        fetchUserInfo();
    }, [status]);

    const difficultyColors = {
        'Hard' : 'bg-red-700' ,
        'Medium': 'bg-orange-600' ,
        'Easy': 'bg-green-600'
    };

    // Check if a problem is solved by the user
    const isProblemSolved = (problemId) => {
        return solvedProblems.has(problemId.toString());
    };

    // Render status badge based on solved status
    const renderStatusBadge = (problem) => {
        if (status === 'loading') {
            return (
                <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium animate-pulse mx-auto w-fit">
                    Loading...
                </div>
            );
        }
        
        if (status === 'unauthenticated') {
            return (
                <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium mx-auto w-fit border border-gray-300">
                    Login to Track
                </div>
            );
        }
        
        if (isProblemSolved(problem._id || problem.id)) {
            return (
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium mx-auto w-fit border border-green-300">
                    ✓ Solved
                </div>
            );
        } else {
            return (
                <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium mx-auto w-fit border border-orange-300">
                    Solve Problem
                </div>
            );
        }
    };



    return (
        <div>
            <div className="p-10 max-md:p-3">
                <div className="relative overflow-auto rounded-xl shadow-xl max-w-6xl mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" text-gray-700 uppercase bg-light-3">
                            <tr>
                                <th scope="col" className="p-6">
                                    Sr No.
                                </th>
                                <th scope="col" className="p-6">
                                    Problem Title
                                </th>
                                <th scope="col" className="p-6">
                                    Difficulty
                                </th>
                                <th scope="col" className="p-6">
                                    Category
                                </th>
                                <th scope="col" className="p-6">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <tr key={index} className="bg-light-2 hover:bg-light-4">
                                    <td className="p-4 text-center">
                                        <div>
                                            {index+1}
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 hover:text-blue-500 hover:font-semibold hover:cursor-pointer font-medium whitespace-nowrap transition-all ease-in">
                                        <div className='w-[300px] text-ellipsis overflow-hidden' 
                                            onClick={() => {
                                            router.push(`/problems/${problem.id}`);
                                        }}>
                                            {problem.title} 
                                        </div>
                                    </th>
                                    <td>
                                        <div className={`w-fit mx-auto px-3 py-1 rounded-full hover:cursor-pointer text-sm text-light-1 ${difficultyColors[problem?.difficulty]}`}>
                                            {problem.difficulty}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {problem.category}
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer">
                                        {renderStatusBadge(problem)}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Problems;