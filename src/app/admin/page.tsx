"use client";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "@/components/ui/LoginForm";
import Loading from "@/components/ui/Loading";
import JobForm from "@/components/ui/JobForm";
import JobList from "@/components/ui/JobList";
import Link from "next/link";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminJobsPage() {
  const { user, loginLoading, logout } = useAuth();
  const route = useRouter()
  if (loginLoading) {
    return <Loading />;
  }
  if (!user) {
    return <LoginForm />;
  }

  const handleLogout = async () => {
   try{
     const res = await logout.mutateAsync()
     console.log(res)
    toast.success("Lougout Success.")
    route.push("/")
   }catch(err){
    console.log(err)
    toast.error("Something Wrong.")
   }
  }
  return (
    <div className="min-h-screen bg-gray">
      <div className="cs-container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--neutrals-100)]">
              Job Dashboard
            </h1>
            <p className="text-[var(--neutrals-80)] mt-1">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="flex items-center gap-2" href="/"><BiLeftArrowAlt /> Back To Home</Link>
            <div onClick={() => handleLogout()} className="bg-[var(--brandColor)] cursor-pointer py-2 px-5 flex items-center justify-center text-white font-semibold">
             Logout
            </div>
          </div>
        </div>
        <JobForm />
        <JobList />
      </div>
    </div>
  );
}
