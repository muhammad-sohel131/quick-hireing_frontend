"use client";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useState } from "react";

export default function LoginForm() {
  const { login, loginLoading } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login.mutateAsync({
      email: loginForm.email as string,
      password: loginForm.password as string,
    });
    console.log(res);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--neutrals-20)] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-[var(--neutrals-20)]">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brandColor)] bg-opacity-10 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-[var(--brandColor)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
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
            disabled={loginLoading}
            className="w-full bg-[var(--brandColor)] hover:bg-[var(--accentColor)] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[var(--brandColor)]/20"
          >
            {loginLoading ? (
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
