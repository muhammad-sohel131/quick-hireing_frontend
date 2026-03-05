import { useJob } from "@/app/hooks/useJob";
import { CreateJobPayload, JobCategory } from "@/app/types/jobs";
import React, { useState } from "react";
import Input from "./Input";
import { BiPlus, BiStar, BiX } from "react-icons/bi";

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
  const [form, setForm] = useState<CreateJobPayload>({
    title: "",
    company: "",
    companyImageUrl: "",
    location: "",
    category: [], // Changed to array
    description: "",
    isFeatured: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setForm({ ...form, [e.target.name]: value });
  };

  const handleCategoryToggle = (category: JobCategory) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      // Update form with new categories array
      setForm({ ...form, category: newCategories });
      return newCategories;
    });
  };

  const removeCategory = (categoryToRemove: JobCategory) => {
    setSelectedCategories(prev => {
      const newCategories = prev.filter(c => c !== categoryToRemove);
      setForm({ ...form, category: newCategories });
      return newCategories;
    });
  };

  const handleSubmit = async () => {
    const res = await createJob.mutateAsync(form);
    console.log(res);
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[var(--neutrals-20)] overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-[var(--brandColor)] to-[var(--accentColor)] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BiPlus />
          Create New Job Posting
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Job Title
            </label>
            <Input
              name="title"
              required
              placeholder="Senior Frontend Developer"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Company Name
            </label>
            <Input
              required
              name="company"
              placeholder="Tech Corp"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Company Logo URL
            </label>
            <Input
              name="companyImageUrl"
              required
              placeholder="https://example.com/logo.png"
              value={form.companyImageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Location
            </label>
            <Input
              required
              name="location"
              placeholder="Dhaka (Remote)"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)]"
            />
          </div>

          {/* Multi-category Selection */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Categories (Select multiple)
            </label>
            
            {/* Selected Categories Tags */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--brandColor)] text-white text-sm rounded-full"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <BiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Category Options */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`
                    px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200
                    ${selectedCategories.includes(category)
                      ? 'bg-[var(--brandColor)] text-white border-[var(--brandColor)] shadow-md'
                      : 'bg-white text-[var(--neutrals-80)] border-[var(--neutrals-20)] hover:border-[var(--brandColor)] hover:text-[var(--brandColor)]'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--neutrals-80)] mt-2">
              Selected: {selectedCategories.length} category(ies)
            </p>
          </div>

          {/* Featured Toggle */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 p-4 bg-[var(--neutrals-20)]/30 rounded-xl border border-[var(--neutrals-20)]">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <label
                  htmlFor="isFeatured"
                  className="relative flex items-center cursor-pointer"
                >
                  {/* Toggle Background */}
                  <div className={`
                    w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
                    ${form.isFeatured 
                      ? 'bg-[var(--brandColor)]' 
                      : 'bg-[var(--neutrals-20)]'
                    }
                  `}>
                    {/* Toggle Circle */}
                    <div className={`
                      absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out
                      ${form.isFeatured ? 'translate-x-8' : 'translate-x-1'}
                    `} />
                  </div>
                  
                  {/* Icons */}
                  <BiStar className={`
                    absolute left-1.5 top-1.5 w-4 h-4 transition-colors duration-200
                    ${form.isFeatured ? 'text-white' : 'text-[var(--neutrals-80)]'}
                  `} />
                  <BiStar className={`
                    absolute right-1.5 top-1.5 w-4 h-4 transition-colors duration-200
                    ${form.isFeatured ? 'text-white' : 'text-[var(--neutrals-80)]'}
                  `} />
                </label>
              </div>
              
              <div className="flex-1">
                <label 
                  htmlFor="isFeatured" 
                  className="font-medium text-[var(--neutrals-100)] cursor-pointer flex items-center gap-2"
                >
                  <BiStar className={form.isFeatured ? 'text-[var(--brandColor)]' : 'text-[var(--neutrals-80)]'} />
                  Mark as Featured Job
                </label>
                <p className="text-xs text-[var(--neutrals-80)] mt-1">
                  Featured jobs appear highlighted and at the top of job listings
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--neutrals-80)] mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the role, responsibilities, and requirements..."
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-[var(--neutrals-20)] focus:ring-2 focus:ring-[var(--brandColor)] focus:outline-none resize-none text-[var(--neutrals-100)] placeholder:text-[var(--neutrals-80)] placeholder:opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={createJob.isPending || selectedCategories.length === 0}
            className="bg-[var(--brandColor)] hover:bg-[var(--accentColor)] text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[var(--brandColor)]/20 flex items-center gap-2"
          >
            {createJob.isPending ? (
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <BiPlus />
                Create Job
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}