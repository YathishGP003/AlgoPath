"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    college: "",
    first_name: "",
    last_name: "",
    username: "",
    graduation_year: "",
    primary_coding_language: "",
    linkedin_profile: "",
    contact_number: "",
    gender: "",
    company: "",
    codeforces_profile: "",
    leetcode_profile: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchUserInfo();
    }
  }, [status, router]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/getUserInfo");
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        setFormData({
          email: data.userInfo?.email || session?.user?.email || "",
          college: data.userInfo?.college || "",
          first_name: data.userInfo?.first_name || "",
          last_name: data.userInfo?.last_name || "",
          username: data.userInfo?.username || "",
          graduation_year: data.userInfo?.graduation_year || "",
          primary_coding_language: data.userInfo?.primary_coding_language || "",
          linkedin_profile: data.userInfo?.linkedin_profile || "",
          contact_number: data.userInfo?.contact_number || "",
          gender: data.userInfo?.gender || "",
          company: data.userInfo?.company || "",
          codeforces_profile: data.userInfo?.codeforces_profile || "",
          leetcode_profile: data.userInfo?.leetcode_profile || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/updateUserInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(formData.email);
    alert("Email copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181818] text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white font-sans relative">
      {/* Back Button */}
      <Link
        href="/problems"
        className="absolute left-12 top-24 md:top-28 text-white hover:text-gray-300 z-10"
      >
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
          className="lucide lucide-arrow-left h-7 w-7"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
      </Link>

      <div className="flex flex-1 items-center justify-center px-4 py-12 mt-10 md:mt-0">
        <div
          className="bg-[#1F1F1F] rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-4xl flex flex-col items-center relative border border-[#2A2A2A]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 32px 0px" }}
        >
          <img
            src="/algologo.png"
            alt="AlgoPath Logo"
            className="w-16 h-16 rounded-full bg-[#2A2A2A] p-2 -mt-20 mb-4 shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Profile Settings
          </h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Email *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border border-[#3A3A3A]">
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
                      className="lucide lucide-mail h-5 w-5 text-gray-500 mr-3"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <input
                      type="email"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-gray-400 flex-1 placeholder-gray-500 border-0 cursor-not-allowed"
                      id="email"
                      disabled
                      value={formData.email}
                    />
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-white transition"
                      onClick={copyEmail}
                    >
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
                        className="lucide lucide-copy h-4 w-4"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* College */}
                <div>
                  <label
                    htmlFor="college"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    College *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border border-[#3A3A3A] cursor-not-allowed">
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
                      className="lucide lucide-school h-5 w-5 text-gray-500 mr-3"
                    >
                      <path d="M14 22v-4a2 2 0 1 0-4 0v4"></path>
                      <path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"></path>
                      <path d="M18 5v17"></path>
                      <path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6"></path>
                      <path d="M6 5v17"></path>
                      <circle cx="12" cy="9" r="2"></circle>
                    </svg>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-gray-400 flex-1 placeholder-gray-500 border-0"
                      id="college"
                      placeholder="College"
                      value={formData.college}
                      disabled
                    />
                  </div>
                </div>

                {/* First Name */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    First Name *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-user h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      name="first_name"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Last Name *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-user h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      name="last_name"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    User Name *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-user h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      name="username"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="username"
                      placeholder="User Name"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Graduation Year */}
                <div>
                  <label
                    htmlFor="graduation_year"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Graduation Year *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-0 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500 relative">
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
                      className="lucide lucide-calendar-days h-5 w-5 text-gray-400 mr-3 ml-0"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                      <path d="M8 14h.01"></path>
                      <path d="M12 14h.01"></path>
                      <path d="M16 14h.01"></path>
                      <path d="M8 18h.01"></path>
                      <path d="M12 18h.01"></path>
                      <path d="M16 18h.01"></path>
                    </svg>
                    <select
                      id="graduation_year"
                      name="graduation_year"
                      className="bg-transparent outline-none text-white flex-1 placeholder-gray-500 appearance-none cursor-pointer h-[46px] pr-8"
                      value={formData.graduation_year}
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#2A2A2A] text-gray-500"
                      >
                        Select Year
                      </option>
                      {Array.from({ length: 31 }, (_, i) => 2030 - i).map(
                        (year) => (
                          <option
                            key={year}
                            value={year}
                            className="bg-[#2A2A2A] text-white"
                          >
                            {year}
                          </option>
                        )
                      )}
                    </select>
                    <div className="absolute right-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Primary Coding Language */}
                <div>
                  <label
                    htmlFor="primary_coding_language"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Primary Coding Language *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-0 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500 relative">
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
                      className="lucide lucide-square-check-big h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <select
                      id="primary_coding_language"
                      name="primary_coding_language"
                      className="bg-transparent outline-none text-white flex-1 placeholder-gray-500 appearance-none cursor-pointer h-[46px] pr-8"
                      value={formData.primary_coding_language}
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#2A2A2A] text-gray-500"
                      >
                        Select Language
                      </option>
                      <option value="CPP" className="bg-[#2A2A2A] text-white">
                        CPP
                      </option>
                      <option value="JAVA" className="bg-[#2A2A2A] text-white">
                        JAVA
                      </option>
                      <option value="C" className="bg-[#2A2A2A] text-white">
                        C
                      </option>
                      <option
                        value="PYTHON"
                        className="bg-[#2A2A2A] text-white"
                      >
                        PYTHON
                      </option>
                      <option value="OTHER" className="bg-[#2A2A2A] text-white">
                        OTHER
                      </option>
                    </select>
                    <div className="absolute right-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* LinkedIn Profile */}
                <div>
                  <label
                    htmlFor="linkedin_profile"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    LinkedIn Profile
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-linkedin h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <input
                      type="url"
                      name="linkedin_profile"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="linkedin_profile"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin_profile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contact_number"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Contact Number *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
                    <input
                      type="tel"
                      name="contact_number"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="contact_number"
                      placeholder="Contact Number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Gender *
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-0 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500 relative">
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
                      className="lucide lucide-users h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <select
                      id="gender"
                      name="gender"
                      className="bg-transparent outline-none text-white flex-1 placeholder-gray-500 appearance-none cursor-pointer h-[46px] pr-8"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#2A2A2A] text-gray-500"
                      >
                        Select Gender
                      </option>
                      <option value="MALE" className="bg-[#2A2A2A] text-white">
                        Male
                      </option>
                      <option
                        value="FEMALE"
                        className="bg-[#2A2A2A] text-white"
                      >
                        Female
                      </option>
                      <option value="OTHER" className="bg-[#2A2A2A] text-white">
                        Other
                      </option>
                    </select>
                    <div className="absolute right-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Company
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-briefcase h-5 w-5 text-gray-400 mr-3"
                    >
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                    <input
                      type="text"
                      name="company"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Codeforces Profile */}
                <div>
                  <label
                    htmlFor="codeforces_profile"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    Codeforces Profile
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-chart-no-axes-column h-5 w-5 text-gray-400 mr-3"
                    >
                      <line x1="18" x2="18" y1="20" y2="10"></line>
                      <line x1="12" x2="12" y1="20" y2="4"></line>
                      <line x1="6" x2="6" y1="20" y2="14"></line>
                    </svg>
                    <input
                      type="url"
                      name="codeforces_profile"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="codeforces_profile"
                      placeholder="Codeforces Profile URL"
                      value={formData.codeforces_profile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* LeetCode Profile */}
                <div>
                  <label
                    htmlFor="leetcode_profile"
                    className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                  >
                    LeetCode Profile
                  </label>
                  <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-3 border transition-colors duration-200 border-[#3A3A3A] focus-within:border-blue-500">
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
                      className="lucide lucide-code h-5 w-5 text-gray-400 mr-3"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <input
                      type="url"
                      name="leetcode_profile"
                      className="flex h-9 w-full rounded-md border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent outline-none text-white flex-1 placeholder-gray-500 border-0"
                      id="leetcode_profile"
                      placeholder="LeetCode Profile URL"
                      value={formData.leetcode_profile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 bg-[#111111] hover:bg-[#282828] text-white font-semibold rounded-md py-3 px-16 shadow-md border border-[#333333] tracking-widest text-base transition-colors duration-150"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none select-none opacity-50">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300 C50 200 150 150 300 0"
            stroke="url(#grad1)"
            strokeWidth="2"
            fill="none"
          ></path>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(108, 99, 255)", stopOpacity: 0 }}
              ></stop>
              <stop
                offset="100%"
                style={{ stopColor: "rgb(108, 99, 255)", stopOpacity: 0.3 }}
              ></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none select-none opacity-50 transform rotate-180">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300 C50 200 150 150 300 0"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="none"
          ></path>
          <defs>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(108, 99, 255)", stopOpacity: 0 }}
              ></stop>
              <stop
                offset="100%"
                style={{ stopColor: "rgb(108, 99, 255)", stopOpacity: 0.3 }}
              ></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
