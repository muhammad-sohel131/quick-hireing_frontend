"use client";
import { useJob } from "@/app/hooks/useJob";
import { CreateJobPayload, JobCategory } from "@/app/types/jobs";
import React, { useState } from "react";
import Input from "./Input";
import { BiPlus, BiStar, BiX, BiInfoCircle } from "react-icons/bi";
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
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState<CreateJobPayload>({
    title: "",
    company: "",
    companyImageUrl: "",
    location: "",
    category: [],
    description: "",
    isFeatured: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>([]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (form.description.length < 30) {
      newErrors.description = `Description must be at least 30 characters (${form.description.length}/30)`;
    }

    if (selectedCategories.length === 0) {
      newErrors.category = "Select at least one category";
    }

    if (!form.companyImageUrl.trim()) {
      newErrors.companyImageUrl = "Company logo URL is required";
    } else if (!/^https:\/\/res\.cloudinary\.com\/.*\/image\/upload\/.*$/.test(form.companyImageUrl)) {
      newErrors.companyImageUrl = "Logo must be a valid Cloudinary image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;

    setForm({ ...form, [e.target.name]: value });
    
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleCategoryToggle = (category: JobCategory) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      
      setForm({ ...form, category: newCategories });
      
      if (errors.category) {
        setErrors((prev) => ({ ...prev, category: "" }));
      }
      
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
    // Mark all fields as touched on submit
    const allFields = ["title", "company", "companyImageUrl", "location", "description", "category"];
    const touched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouchedFields(touched);

    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await createJob.mutateAsync(form);
      toast.success("Job posted successfully! 🎉");
      
      // Reset form
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
      setTouchedFields({});
    } catch (err) {
      toast.error("Failed to publish job. Please try again.");
      console.log(err);
    }
  };

  const getFieldError = (field: string) => {
    return touchedFields[field] && errors[field] ? errors[field] : "";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BiPlus className="text-gray-600" size={20} />
          Create New Job Posting
        </h2>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Two Column Layout for basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                placeholder="e.g., Senior Frontend Developer"
                value={form.title}
                onChange={handleChange}
                onBlur={() => handleBlur("title")}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  getFieldError("title") 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {getFieldError("title") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <BiInfoCircle size={14} />
                  {getFieldError("title")}
                </p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="company"
                placeholder="e.g., Tech Corp"
                value={form.company}
                onChange={handleChange}
                onBlur={() => handleBlur("company")}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  getFieldError("company") 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {getFieldError("company") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <BiInfoCircle size={14} />
                  {getFieldError("company")}
                </p>
              )}
            </div>

            {/* Logo URL */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Company Logo URL <span className="text-red-500">*</span>
              </label>
              <Input
                name="companyImageUrl"
                placeholder="https://res.cloudinary.com/..."
                value={form.companyImageUrl}
                onChange={handleChange}
                onBlur={() => handleBlur("companyImageUrl")}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  getFieldError("companyImageUrl") 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {getFieldError("companyImageUrl") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <BiInfoCircle size={14} />
                  {getFieldError("companyImageUrl")}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Must be a Cloudinary image URL
              </p>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <Input
                name="location"
                placeholder="e.g., Dhaka (Remote)"
                value={form.location}
                onChange={handleChange}
                onBlur={() => handleBlur("location")}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  getFieldError("location") 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {getFieldError("location") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <BiInfoCircle size={14} />
                  {getFieldError("location")}
                </p>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Categories <span className="text-red-500">*</span>
            </label>
            
            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-200"
                  >
                    {cat}
                    <button
                      onClick={() => removeCategory(cat)}
                      className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${cat}`}
                    >
                      <BiX size={16} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Category Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all
                    ${
                      selectedCategories.includes(category)
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {touchedFields.category && errors.category && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <BiInfoCircle size={14} />
                {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={6}
              value={form.description}
              onChange={handleChange}
              onBlur={() => handleBlur("description")}
              placeholder="Describe the job role, responsibilities, requirements, and benefits..."
              className={`w-full px-4 py-3 rounded-lg border resize-y ${
                getFieldError("description")
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            <div className="flex justify-between items-center">
              {getFieldError("description") ? (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <BiInfoCircle size={14} />
                  {getFieldError("description")}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Minimum 30 characters
                </p>
              )}
              <span className={`text-xs ${
                form.description.length < 30 ? "text-gray-400" : "text-green-600"
              }`}>
                {form.description.length}/30
              </span>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 py-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="isFeatured" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 cursor-pointer">
                  <BiStar size={16} className="text-yellow-500" />
                  Mark as Featured Job
                </label>
                <p className="text-xs text-gray-500">
                  Featured jobs get priority placement and more visibility
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={createJob.isPending}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
            >
              {createJob.isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <BiPlus size={18} />
                  Create Job
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}