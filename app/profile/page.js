"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  async function fetchUserInfo() {
    try {
      const response = await axios.get("/api/getUserInfo");
      const userData = response.data;
      setData(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchUserInfo();
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
            {data?.userInfo?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {data?.userInfo?.name || "User"}
            </h1>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Problem Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Solved:</span>
                <span className="font-semibold">{data?.userInfo?.solved?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Easy:</span>
                <span className="font-semibold text-green-600">
                  {data?.userInfo?.solved?.filter(p => p.difficulty === 'Easy')?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medium:</span>
                <span className="font-semibold text-orange-600">
                  {data?.userInfo?.solved?.filter(p => p.difficulty === 'Medium')?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hard:</span>
                <span className="font-semibold text-red-600">
                  {data?.userInfo?.solved?.filter(p => p.difficulty === 'Hard')?.length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">
                  {data?.userInfo?.createdAt ? new Date(data.userInfo.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admin:</span>
                <span className={`font-semibold ${data?.userInfo?.admin ? 'text-blue-600' : 'text-gray-600'}`}>
                  {data?.userInfo?.admin ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {data?.userInfo?.solved?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recently Solved Problems</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid gap-2">
                {data.userInfo.solved.slice(-5).reverse().map((problem, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium">{problem.title || `Problem #${index + 1}`}</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      problem.difficulty === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {problem.difficulty || 'Unknown'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
