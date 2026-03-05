"use client";

import React, { useState } from "react";
import Input from "./Input";
import { BiSend, BiUser, BiEnvelope, BiLink } from "react-icons/bi";
import { useJob } from "@/app/hooks/useJob";

interface ApplyJobFormProps {
  jobId: string;
}

export default function ApplyJobForm({ jobId }: ApplyJobFormProps) {
  const { createJobApplication } = useJob();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      job_id: jobId,
    };

    await createJobApplication.mutateAsync(payload);

    setForm({
      name: "",
      email: "",
      resume_link: "",
      cover_note: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[var(--neutrals-20)] overflow-hidden mt-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--brandColor)] to-[var(--accentColor)] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BiSend />
          Apply for this Job
        </h2>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Full Name
            </label>
            <div className="relative">
              <BiUser className="absolute left-3 top-3.5 text-[var(--neutrals-80)]" />
              <Input
                name="name"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Email Address
            </label>
            <div className="relative">
              <BiEnvelope className="absolute left-3 top-3.5 text-[var(--neutrals-80)]" />
              <Input
                type="email"
                name="email"
                required
                placeholder="john@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
              />
            </div>
          </div>

          {/* Resume Link */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Resume Link
            </label>
            <div className="relative">
              <BiLink className="absolute left-3 top-3.5 text-[var(--neutrals-80)]" />
              <Input
                name="resume_link"
                required
                placeholder="https://drive.google.com/your-resume"
                value={form.resume_link}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
              />
            </div>
          </div>

          {/* Cover Note */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Cover Note
            </label>
            <textarea
              name="cover_note"
              rows={5}
              placeholder="Why are you a good fit for this role?"
              value={form.cover_note}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)] focus:outline-none resize-none text-[var(--neutrals-100)] placeholder:text-[var(--neutrals-80)] placeholder:opacity-50"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[var(--brandColor)] hover:bg-[var(--accentColor)] text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--brandColor)]/20 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <BiSend />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
