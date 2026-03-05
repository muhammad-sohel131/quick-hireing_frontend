"use client";
import { useJob } from "@/app/hooks/useJob";
import { CreateJobPayload, JobCategory } from "@/app/types/jobs";
import React, { useState } from "react";
import Input from "./Input";
import { BiPlus, BiStar, BiX } from "react-icons/bi";
import toast from "react-hot-toast";

const categories: JobCategory[] = [
  "Design",
  "Marketing",
  "Business",
  "Technology",
  "Engineering",
  "Finance",
  "Human Resource",
];

export default function JobForm() {
  const { createJob } = useJob();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<CreateJobPayload>({
    title: "",
    company: "",
    companyImageUrl: "",
    location: "",
    category: [],
    description: "",
    isFeatured: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>(
    []
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = "Job title is required";

    if (!form.company.trim()) newErrors.company = "Company name is required";

    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (form.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters";
    }

    if (selectedCategories.length === 0) {
      newErrors.category = "Select at least one category";
    }

    if (!form.companyImageUrl.trim()) {
      newErrors.companyImageUrl = "Company logo URL is required";
    } else if (
      !/^https:\/\/res\.cloudinary\.com\/.*\/image\/upload\/.*$/.test(
        form.companyImageUrl
      )
    ) {
      newErrors.companyImageUrl = "Logo must be a valid Cloudinary image URL";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setForm({ ...form, [e.target.name]: value });

    // clear error when typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleCategoryToggle = (category: JobCategory) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      setForm({ ...form, category: newCategories });

      setErrors((prev) => ({ ...prev, category: "" }));

      return newCategories;
    });
  };

  const removeCategory = (categoryToRemove: JobCategory) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.filter((c) => c !== categoryToRemove);
      setForm({ ...form, category: newCategories });
      return newCategories;
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await createJob.mutateAsync(form);

      toast.success("Job Published Successfully");

      setForm({
        title: "",
        company: "",
        companyImageUrl: "",
        location: "",
        category: [],
        description: "",
        isFeatured: false,
      });

      setSelectedCategories([]);
    } catch (err) {
      toast.error("Failed to publish job");
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[var(--neutrals-20)] overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-[var(--brandColor)] to-[var(--accentColor)] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BiPlus /> Create New Job Posting
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Job Title */}
          <div>
            <label className="block text-sm mb-2">Job Title</label>
            <Input
              name="title"
              placeholder="Senior Frontend Developer"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm mb-2">Company Name</label>
            <Input
              name="company"
              placeholder="Tech Corp"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">{errors.company}</p>
            )}
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm mb-2">Company Logo URL</label>
            <Input
              name="companyImageUrl"
              placeholder="Cloudinary Image URL"
              value={form.companyImageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />
            {errors.companyImageUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.companyImageUrl}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-2">Location</label>
            <Input
              name="location"
              placeholder="Dhaka (Remote)"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2">Categories</label>

            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--brandColor)] text-white text-sm rounded-full"
                  >
                    {cat}
                    <button onClick={() => removeCategory(cat)}>
                      <BiX />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-xl border text-sm
                    ${
                      selectedCategories.includes(category)
                        ? "bg-[var(--brandColor)] text-white"
                        : "bg-white hover:border-[var(--brandColor)]"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {errors.category && (
              <p className="text-red-500 text-xs mt-2">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2">Job Description</label>
            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={createJob.isPending}
            className="bg-[var(--brandColor)] text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            {createJob.isPending ? "Creating..." : <> <BiPlus /> Create Job </>}
          </button>
        </div>
      </div>
    </div>
  );
}