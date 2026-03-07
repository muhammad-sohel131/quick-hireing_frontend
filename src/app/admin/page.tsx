"use client";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "@/components/ui/LoginForm";
import Loading from "@/components/ui/Loading";
import JobForm from "@/components/ui/JobForm";
import JobList from "@/components/ui/JobList";
import Link from "next/link";
import { BiLeftArrowAlt, BiPlus, BiListUl} from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TabType = "form" | "list";

export default function AdminJobsPage() {
  const { user, loginLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("list");

  if (loginLoading) {
    return <Loading />;
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleLogout = async () => {
    try {
      const res = await logout.mutateAsync();
      console.log(res);
      toast.success("Logout Success.");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="cs-container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <BiLeftArrowAlt size={20} />
              Back To Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 cursor-pointer py-2 px-5 rounded-lg text-white font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-2" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("list")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-all ${
                  activeTab === "list"
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BiListUl size={18} />
                View Jobs
                <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  List
                </span>
              </button>
              <button
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-all ${
                  activeTab === "form"
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BiPlus size={18} />
                Create New Job
                <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  Form
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "form" ? (
            <div className="animate-fadeIn">
              <JobForm />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <JobList />
            </div>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
