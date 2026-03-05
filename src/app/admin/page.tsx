"use client";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "@/components/ui/LoginForm";
import Loading from "@/components/ui/Loading";
import JobForm from "@/components/ui/JobForm";
import JobList from "@/components/ui/JobList";

export default function AdminJobsPage() {
  const { user, loginLoading } = useAuth();

  if (loginLoading) {
    return <Loading />;
  }
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--neutrals-20)]">
      <div className="cs-container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--neutrals-100)]">
              Job Dashboard
            </h1>
            <p className="text-[var(--neutrals-80)] mt-1">
              Welcome back, {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--brandColor)] rounded-full flex items-center justify-center text-white font-semibold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        <JobForm />
        <JobList />
      </div>
    </div>
  );
}
