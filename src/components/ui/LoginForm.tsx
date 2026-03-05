"use client";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { login} = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login.mutateAsync({
        email: loginForm.email as string,
        password: loginForm.password as string,
      });
      toast.success("Login Successful.");
    } catch (err) {
      toast.error("Failed To Login. Incorrect Credential.");
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--neutrals-20)] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-[var(--neutrals-20)]">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-center flex justify-center my-5">
            <Image src="/images/Logo.png" height={36} width={152} alt="logo" />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--neutrals-100)]">
            Admin Dashboard
          </h1>
          <p className="text-[var(--neutrals-80)] text-sm mt-2">
            Sign in to manage job postings
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent transition-all text-[var(--neutrals-100)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:outline-none focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent transition-all text-[var(--neutrals-100)]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--brandColor)] hover:bg-[var(--accentColor)] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[var(--brandColor)]/20"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--neutrals-80)] mt-6">
          Secure admin access only
        </p>
      </div>
    </div>
  );
}
