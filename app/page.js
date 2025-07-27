import Link from 'next/link';
import { FaCode, FaRocket, FaTrophy, FaUsers } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
                <HiSparkles className="mr-2" />
                A New Way to Learn
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Master Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Coding Skills
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                AlgoPath is the best platform to help you enhance your skills, expand 
                your knowledge and prepare for technical interviews.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/problems" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <FaCode className="mr-2" />
                  Start Coding
                </Link>
                <Link href="/login" className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20">
                  Sign Up Free
                </Link>
              </div>
            </div>

            {/* Right Content - Floating Code Editor Mockup */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Main Code Editor Window */}
                <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-96 max-w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Window Header */}
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-gray-400 text-sm">two-sum.py</div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="font-mono text-sm">
                    <div className="text-purple-400">def</div>
                    <div className="text-blue-400 ml-4">twoSum(nums, target):</div>
                    <div className="text-gray-400 ml-8"># Your solution here</div>
                    <div className="text-green-400 ml-8">for i in range(len(nums)):</div>
                    <div className="text-yellow-400 ml-12">for j in range(i+1, len(nums)):</div>
                    <div className="text-pink-400 ml-16">if nums[i] + nums[j] == target:</div>
                    <div className="text-blue-300 ml-20">return [i, j]</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  ✓ Accepted
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Runtime: 52ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AlgoPath?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice is a well-organized tool that helps you get the most out of 
              AlgoPath by providing structure to guide your progress towards the next 
              step in your programming career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FaCode className="text-3xl text-purple-500" />}
              title="100+ Problems"
              description="Solve coding challenges from easy to hard difficulty levels"
            />
            <FeatureCard 
              icon={<FaRocket className="text-3xl text-blue-500" />}
              title="Real-time Feedback"
              description="Get instant results and detailed explanations for your solutions"
            />
            <FeatureCard 
              icon={<FaTrophy className="text-3xl text-yellow-500" />}
              title="Track Progress"
              description="Monitor your improvement with detailed analytics and achievements"
            />
            <FeatureCard 
              icon={<FaUsers className="text-3xl text-green-500" />}
              title="Community"
              description="Learn from others and share your knowledge with the community"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already improving their skills with AlgoPath.
          </p>
          <Link href="/problems" className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started
            <FaRocket className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="mb-6 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
}


