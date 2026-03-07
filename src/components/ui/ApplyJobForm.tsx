"use client";

import React, { useState } from "react";
import Input from "./Input";
import { BiSend, BiUser, BiEnvelope, BiLink } from "react-icons/bi";
import { useJob } from "@/app/hooks/useJob";
import toast from "react-hot-toast";

interface ApplyJobFormProps {
  jobId: string;
}
interface ValidateError {
  name?: string;
  email?: string;
  resume_link?: string;
  cover_note?: string;
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

  const [errors, setErrors] = useState<ValidateError>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: ValidateError = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.resume_link.trim()) {
      newErrors.resume_link = "Resume link is required";
    } else if (!form.resume_link.startsWith("http")) {
      newErrors.resume_link = "Enter a valid URL";
    }

    if (!form.cover_note.trim()) {
      newErrors.cover_note = "Cover note is required";
    } else if (form.cover_note.length < 20) {
      newErrors.cover_note = "Cover note must be at least 20 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

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

      toast.success("Application is Sent to Company");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Apply. Contact with Admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white my-10 rounded-2xl shadow-xl border border-[var(--neutrals-20)] overflow-hidden mt-12">
      {/* Header */}
      <div className="bg-[var(--brandColor)] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BiSend />
          Apply for this Job
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <Input
                name="name"
                placeholder="Md Sohel"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border rounded-xl"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="sohelf131@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border rounded-xl"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Resume */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Resume Link
            </label>
            <div className="relative">
              <Input
                name="resume_link"
                placeholder="https://drive.google.com/your-resume"
                value={form.resume_link}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border rounded-xl"
              />
            </div>
            {errors.resume_link && (
              <p className="text-red-500 text-xs mt-1">{errors.resume_link}</p>
            )}
          </div>

          {/* Cover Note */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Cover Note</label>
            <textarea
              name="cover_note"
              rows={5}
              value={form.cover_note}
              onChange={handleChange}
              placeholder="Why are you a good fit for this role?"
              className="w-full px-4 py-3 border rounded-xl"
            />
            {errors.cover_note && (
              <p className="text-red-500 text-xs mt-1">{errors.cover_note}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[var(--brandColor)] text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <BiSend /> Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
