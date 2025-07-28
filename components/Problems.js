"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSolution } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { mockProblemsData } from "@/constants";

const Problems = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [problems, setProblems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  // Fetch user info and solved problems
  const fetchUserInfo = async () => {
    if (status === "authenticated") {
      try {
        const response = await fetch("/api/getUserInfo");
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);

          // Create a Set of solved problem IDs for quick lookup
          const solvedIds = new Set();
          if (userData.solved && userData.solved.length > 0) {
            userData.solved.forEach((solvedProblem) => {
              if (solvedProblem.problem) {
                solvedIds.add(solvedProblem.problem.toString());
              }
            });
          }
          setSolvedProblems(solvedIds);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("/api/getAllProblems");
      const data = await response.json();
      setProblems(data);
    };
    fetchProblems();
    fetchUserInfo();
  }, [status]);

  const difficultyColors = {
    Hard: "text-red-400 bg-red-400/10 border border-red-400/30",
    Medium: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30",
    Easy: "text-green-400 bg-green-400/10 border border-green-400/30",
  };

  // Check if a problem is solved by the user
  const isProblemSolved = (problemId) => {
    return solvedProblems.has(problemId.toString());
  };

  // Render status badge based on solved status
  const renderStatusBadge = (problem) => {
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (status === "unauthenticated") {
      return <div className="text-gray-400 text-sm">Login to Track</div>;
    }

    if (isProblemSolved(problem._id || problem.id)) {
      return (
        <div className="flex items-center text-green-400">
          <ImCheckboxChecked className="w-4 h-4" />
        </div>
      );
    } else {
      return (
        <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Problems</h1>
          <p className="text-gray-400">
            Solve coding problems to improve your algorithmic thinking
          </p>
        </div>

        {/* Problems Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300 w-16">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                  Title
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300 w-32">
                  Acceptance
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300 w-32">
                  Difficulty
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300 w-40">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-150 cursor-pointer group"
                  onClick={() => router.push(`/problems/${problem.id}`)}
                >
                  <td className="py-4 px-6">{renderStatusBadge(problem)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-4 w-6">
                        {index + 1}.
                      </span>
                      <span className="text-white group-hover:text-blue-400 transition-colors duration-150 font-medium">
                        {problem.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400 text-sm">
                      {Math.floor(Math.random() * 30 + 40)}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        difficultyColors[problem?.difficulty]
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400 text-sm">
                      {problem.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
          <div>Showing {problems.length} problems</div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span>Easy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span>Hard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
