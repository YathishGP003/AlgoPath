"use client";

import Link from "next/link";
import { FaCode, FaRocket, FaTrophy, FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";

export default function Home() {
  // FAQ state
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "What is AlgoPath?",
      answer:
        "AlgoPath is a platform for mastering Data Structures and Algorithms with curated resources, interactive problems, and expert guidance.",
    },
    {
      question: "How does AlgoPath work?",
      answer:
        "AlgoPath provides a structured roadmap, interactive coding problems, and real-time feedback to help you learn and practice DSA effectively.",
    },
    {
      question: "Is AlgoPath right for my preparation?",
      answer:
        "Yes! Whether you're preparing for interviews, competitive programming, or just want to improve your problem-solving skills, AlgoPath is designed for you.",
    },
    {
      question: "How can I set up my account for AlgoPath?",
      answer:
        "Simply register with your email, verify your account, and start your learning journey!",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#181818] text-white relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full pt-8 pb-8 relative">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
        {/* Floating Language Icons */}
        <img
          src="/java_logo.png"
          alt="Java"
          className="hidden md:block absolute z-20 left-10 top-24 w-14 h-14"
        />
        <img
          src="/python_logo.png"
          alt="Python"
          className="hidden md:block absolute z-20 left-1/4 top-2/4 w-16 h-16"
          style={{ transform: "translateY(-50%)" }}
        />
        <img
          src="/cpp_logo.png"
          alt="C++"
          className="hidden md:block absolute z-20 right-10 top-20 w-14 h-14"
        />
        <img
          src="/go_logo.png"
          alt="Go"
          className="hidden md:block absolute z-20 right-1/4 top-2/4 w-18 h-18"
          style={{ transform: "translateY(-50%)" }}
        />
        <h1 className="z-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mt-8">
          <span className="text-blue-500">The DSA Path</span>{" "}
          <span className="text-white">
            That Doesn't
            <br className="hidden md:inline" />
            Leave You Guessing
          </span>
        </h1>
        <p className="z-20 text-base sm:text-lg md:text-xl text-gray-300 mt-6 mb-8 text-center max-w-2xl">
          Master DSA with curated resources and expert guidance from India's Top
          15 Programmers and ICPC Regionalists
        </p>
        <div className="z-20 flex justify-center mb-12">
          <a href="/problems">
            <button className="justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 bg-[#232323] hover:bg-[#333] text-white font-semibold rounded-xl px-8 py-4 text-lg flex items-center gap-2 shadow-lg">
              Explore{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right w-5 h-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </a>
        </div>
        <div className="z-20 w-full flex justify-center mt-12">
          <img
            src="/Hero_Dashboard.png"
            alt="Hero Dashboard"
            className="w-full max-w-4xl rounded-2xl shadow-2xl border-8 border-[#000000] bg-[#181818] object-contain"
            style={{ minHeight: "200px" }}
          />
        </div>
      </section>

      {/* Features Section: Step 1 - With Confidence and Clarity */}
      <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-2 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
        <div className="relative z-20 flex flex-col items-center mb-12">
          <span className="uppercase text-white text-lg md:text-xl font-bold tracking-wide mb-4 text-center">
            Explore the AlgoPath Way
          </span>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-14 bg-white/70"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7B61FF] text-white font-bold text-lg border-4 border-[#181818] shadow-lg mb-2">
              1
            </div>
            <span className="uppercase text-white text-base font-semibold tracking-wide mb-2">
              Learn
            </span>
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold text-center mt-6 mb-2 text-[#4ADE80]"
            id="ide"
          >
            With Confidence and Clarity
          </h2>
          <p className="text-base md:text-lg text-gray-300 text-center max-w-2xl mb-4">
            Interactive DSA courses, real-time feedback from CodeGenie, and 24/7
            AI support — so you're never stuck for long.
          </p>
        </div>
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-12 mt-8">
          <div
            className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/20 z-30"
            style={{ transform: "translateX(-50%)" }}
          ></div>
          <div
            className="hidden lg:block absolute left-1/2 top-[calc(50%+2rem)] z-40"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="w-6 h-6 bg-[#181818] border-4 border-white/40 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
          </div>
          {/* Editor Preview */}
          <div className="relative w-full max-w-xl flex flex-col items-center flex-1 lg:pr-12">
            <img
              src="/editor_preview.png"
              alt="Editor Preview"
              className="w-full rounded-xl shadow-2xl border-4 border-[#232323] bg-[#181818] object-contain"
              style={{ minHeight: "100px" }}
            />
            <button className="justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hidden bg-[#000000] hover:bg-[#111111] text-[#FFA629] !px-3 !py-0 m-0 rounded-lg text-sm md:flex items-center gap-1 shadow-lg absolute top-1/2 -left-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-play w-4 h-4"
              >
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
              Run
            </button>
            <button className="justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 hidden bg-[#000000] hover:bg-[#111111] text-[#02F98E] px-2 py-1 rounded-lg text-sm md:flex items-center gap-1 shadow-lg absolute top-1/3 right-4">
              <img src="/submit_icon.svg" className="w-4 h-4" alt="Submit" />{" "}
              Submit
            </button>
          </div>
          {/* Feature Description */}
          <div className="flex flex-col items-center lg:items-start max-w-xl flex-1 lg:pl-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-terminal w-16 h-16 mb-4 text-white"
            >
              <path d="m7 11 2-2-2-2"></path>
              <path d="M11 13h4"></path>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            </svg>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-center lg:text-left">
              With In-Browser IDE with Integrated Online Judge and Clarity
            </h3>
            <p className="text-gray-300 text-base md:text-lg text-center lg:text-left">
              Our inbuilt IDE is fast, lightweight, and built for serious
              problem solving. No setup needed — just open a problem, start
              coding, and test your solutions instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section: Step 2 - CodeGenie */}
      <section className="relative w-full flex flex-col items-center justify-center pt-8 pb-32 px-2 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div
          className="hidden lg:block absolute left-1/2 top-[calc(50%+2rem)] z-40"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="w-6 h-6 bg-[#181818] border-4 border-white/40 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-12 mt-8">
          <div
            id="genie"
            className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/20 z-30"
            style={{ transform: "translateX(-50%)" }}
          ></div>
          {/* CodeGenie Images */}
          <div className="relative w-full max-w-xl flex flex-col items-center min-h-[400px] flex-1 lg:pr-12">
            <img
              src="/code_red.png"
              alt="Code Red"
              className="absolute top-10 md:top-0 left-0 w-[80%] max-w-lg rounded-lg shadow-xl"
              style={{ zIndex: 2 }}
            />
            <img
              src="/genie.png"
              alt="Genie"
              className="absolute left-1/3 top-1/3 w-44 h-44 -translate-x-1/2 -translate-y-1/2 z-30"
            />
            <img
              src="/code_green.png"
              alt="Code Green"
              className="absolute bottom-0 left-8 w-[85%] max-w-lg rounded-lg shadow-xl"
              style={{ zIndex: 1 }}
            />
            <div className="h-[350px] w-full"></div>
          </div>
          {/* Feature Description */}
          <div className="flex flex-col items-center lg:items-start max-w-xl flex-1 lg:pl-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bot w-16 h-16 mb-4 text-white"
            >
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center lg:text-left">
              CodeGenie — Your AI Coding Companion
            </h3>
            <p className="text-gray-300 text-lg md:text-xl text-center lg:text-left">
              CodeGenie lives inside your coding experience, analyzing your
              Wrong Answers and showing exactly what's going wrong — and how to
              fix it.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section: Step 3 - Roadmap */}
      <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-2 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
        <div className="relative z-20 flex flex-col items-center mb-12">
          <span className="uppercase text-white text-lg md:text-xl font-bold tracking-wide mb-4 text-center">
            Map Your Journey
          </span>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-14 bg-white/70"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7B61FF] text-white font-bold text-lg border-4 border-[#181818] shadow-lg mb-2">
              2
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mt-6 mb-2 text-[#4ADE80]">
            A Visual Guide to DSA Mastery
          </h2>
          <p className="text-base md:text-lg text-gray-300 text-center max-w-2xl mb-4">
            Unlock concepts through an interactive tree roadmap. Grow your
            skills with each node — guided by AI insights, from basics to
            mastery.
          </p>
        </div>
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-12 mt-8">
          <div
            className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/20 z-30"
            style={{ transform: "translateX(-50%)" }}
          ></div>
          <div
            className="hidden lg:block absolute left-1/2 top-1/2 z-40"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="w-6 h-6 bg-[#181818] border-4 border-white/40 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
          </div>
          {/* Roadmap Preview */}
          <div
            className="relative w-full max-w-xl flex flex-col items-center flex-1 lg:pr-12"
            id="roadmap"
          >
            <img
              src="/tree_node.png"
              alt="Roadmap Preview"
              className="w-full max-w-md rounded-xl shadow-2xl object-contain"
              style={{ minHeight: "200px" }}
            />
          </div>
          {/* Feature Description */}
          <div className="flex flex-col items-center lg:items-start max-w-xl flex-1 lg:pl-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-route w-16 h-16 mb-4 text-white"
            >
              <circle cx="6" cy="19" r="3"></circle>
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
              <circle cx="18" cy="5" r="3"></circle>
            </svg>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center lg:text-left">
              A Perfect Roadmap
            </h3>
            <p className="text-gray-300 text-base md:text-lg text-center lg:text-left">
              Most unique and carefully thought DSA Roadmap by India's top 15
              programmers and ICPC Regionalists who cracked FAANG, HFTs and what
              not!
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      {/* <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-2 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <h2 className="z-20 text-2xl md:text-4xl font-bold text-center mb-16 mt-4">
          JOIN OUR <span className="text-[#E04B4A]">ALGOUNIVERSITY</span>{" "}
          COMMUNITY
        </h2>
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
          <StatCard value="1,972+" label="upskilled & placed" />
          <StatCard value="1 Crore" label="Highest CTC (Domestic)" />
          <StatCard value="25 LPA" label="Avg. CTC" />
          <StatCard value="INR 75K+" label="Avg. Stipend" />
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-2 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div
          id="faqs"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"
        ></div>
        <h2 className="z-20 text-4xl md:text-5xl font-bold text-center mb-12 text-[#E04B4A]">
          FAQ
        </h2>
        <img
          src="/squiggle.svg"
          alt="FAQ"
          className="w-full max-w-md rounded-xl shadow-2xl object-contain mb-10"
        />
        <div className="relative z-20 w-full max-w-2xl mx-auto bg-transparent rounded-xl divide-y divide-[#232323] px-5 md:px-0">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-black border-t border-[#232323] pt-12 pb-8 px-4 md:px-0 mt-0">
        <div className="absolute inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>
        <div className="relative z-10 w-full px-10 mx-auto flex flex-col items-center md:flex-row justify-center gap-12 md:gap-0">
          <div className="flex-1 flex flex-col items-start gap-4 min-w-[220px] mx-auto ">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/algologo.png"
                alt="AlgoPath Logo"
                className="w-10 h-10 rounded-md"
              />
              <span className="text-2xl font-bold text-white">AlgoPath</span>
            </div>
            <p className="text-white/90 text-lg max-w-md mb-4">
              Join AlgoPath by AlgoUniversity — your guided journey to DSA
              mastery and tech excellence. Learn by doing, grow with AI-powered
              feedback, and get job-ready for top-tier tech roles.
            </p>
            <div className="flex gap-4 mt-2">
              <FooterSocialLinks />
            </div>
          </div>
          <div className="flex-1 flex flex-row w-full justify-center md:justify-end gap-8 md:gap-0 mt-8 md:mt-0 ">
            <div className="flex-1 flex flex-col items-center min-w-[140px] max-w-xs mx-auto ">
              <h4 className="text-xl font-bold text-white mb-2">Browse</h4>
              <div className="w-12 h-0.5 bg-[#E04B4A] mb-4"></div>
              <ul className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition bg-transparent border-none outline-none p-0"
                >
                  <span className="text-[#E04B4A]">›</span> IDE
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition bg-transparent border-none outline-none p-0"
                >
                  <span className="text-[#E04B4A]">›</span> Genie
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition bg-transparent border-none outline-none p-0"
                >
                  <span className="text-[#E04B4A]">›</span> Roadmap
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition bg-transparent border-none outline-none p-0"
                >
                  <span className="text-[#E04B4A]">›</span> FAQs
                </button>
              </ul>
            </div>
            <div className="flex-1 flex flex-col items-center min-w-[140px] max-w-xs mx-auto ">
              <h4 className="text-xl font-bold text-white mb-2">Quick Links</h4>
              <div className="w-20 h-0.5 bg-[#E04B4A] mb-4"></div>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="https://www.algouniversity.com/events"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition"
                  >
                    <span className="text-[#E04B4A]">›</span> Events
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.algouniversity.com/blogs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition"
                  >
                    <span className="text-[#E04B4A]">›</span> Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.algouniversity.com/team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition"
                  >
                    <span className="text-[#E04B4A]">›</span> Team
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.algouniversity.com/audevday"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-[#E04B4A] cursor-pointer transition"
                  >
                    <span className="text-[#E04B4A]">›</span> AUDEVDAY
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-[#181818] border border-[#232323] rounded-lg shadow-[0_0_32px_0_rgba(224,75,74,0.15)] flex flex-col items-center justify-center py-12 px-6 min-h-[180px]">
      <span className="text-4xl md:text-5xl font-bold text-white mb-2">
        <span className="inline-block tabular-nums tracking-wider dark:text-white text-white">
          {value}
        </span>
      </span>
      <span className="text-lg text-white/90 font-medium mt-2">{label}</span>
    </div>
  );
}

// ... existing code ...
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="py-6 border-b border-[#232323]">
      <div className="flex items-center justify-between">
        <button
          className="flex-1 text-left text-lg md:text-2xl font-bold text-white focus:outline-none transition-colors"
          onClick={onClick}
          aria-expanded={isOpen}
          style={{ minHeight: "48px" }}
        >
          {question}
        </button>
        <button
          onClick={onClick}
          aria-label={isOpen ? "Collapse" : "Expand"}
          className="ml-6 flex items-center justify-center w-14 h-14 rounded-full border border-[#444] bg-transparent hover:bg-[#232323] transition-colors focus:outline-none"
        >
          {isOpen ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {isOpen && (
          <div className="text-white/80 text-base md:text-lg pt-2 pb-2 px-2 pl-0 md:pl-4">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}

function FooterSocialLinks() {
  return (
    <>
      <a
        href="https://www.instagram.com/algouniversity/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-1 transition hover:scale-110"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="white">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="6"
            strokeWidth="2"
          ></rect>
          <circle cx="12" cy="12" r="5" strokeWidth="2"></circle>
          <circle cx="17.5" cy="6.5" r="1.5" fill="white"></circle>
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/company/algouniversity/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#0077b5] p-1 transition hover:scale-110"
      >
        <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="6"></rect>
          <path
            d="M7 10v7M7 7v.01M12 17v-4a2 2 0 1 1 4 0v4"
            stroke="#181818"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </a>
      <a
        href="https://www.youtube.com/channel/UCD7pW2sIEX2BxIL0yFU63Rw"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#FF0000] p-1 transition hover:scale-110"
      >
        <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="6"></rect>
          <polygon points="10,8 16,12 10,16" fill="#181818"></polygon>
        </svg>
      </a>
      <a
        href="https://www.facebook.com/algouniversity"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#1877f3] p-1 transition hover:scale-110"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="10" fill="#1877f3"></circle>
          <path
            d="M15.36 8.5h-2.02V7.44c0-.37.25-.46.42-.46h1.56V5.09L13.4 5c-2.01 0-2.4 1.5-2.4 2.46V8.5H9.5V10.5h1.5V19h2.34v-8.5h1.57l.25-2z"
            fill="white"
          ></path>
        </svg>
      </a>
      <a
        href="https://discord.gg/NEVFDNbWsn"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#5865F2] p-2 transition hover:scale-110"
      >
        <svg
          viewBox="0 0 71 55"
          fill="white"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M60.104 4.552A58.005 58.005 0 0045.93 0l-1.295 2.384a54.167 54.167 0 00-17.27 0L26.07 0A57.952 57.952 0 0010.9 4.552C2.35 18.642.184 32.14.726 45.52a58.083 58.083 0 0017.63 5.645l2.417-3.312a36.144 36.144 0 01-5.774-2.724c.483-.36.953-.734 1.413-1.12a38.96 38.96 0 0034.171 0c.46.387.93.76 1.413 1.12a36.155 36.155 0 01-5.774 2.724l2.417 3.312a58.084 58.084 0 0017.63-5.645c.566-13.38-1.623-26.878-10.176-40.968zM23.264 37.236c-3.193 0-5.812-2.933-5.812-6.546 0-3.612 2.588-6.56 5.813-6.56 3.238 0 5.84 2.96 5.813 6.56.001 3.612-2.62 6.546-5.813 6.546zm24.472 0c-3.193 0-5.812-2.933-5.812-6.546 0-3.612 2.588-6.56 5.812-6.56 3.238 0 5.84 2.96 5.813 6.56 0 3.612-2.62 6.546-5.813 6.546z"></path>
        </svg>
      </a>
    </>
  );
}
