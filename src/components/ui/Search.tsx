"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    router.push(`/jobs/${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-6 bg-white lg:p-3 flex flex-col justify-between lg:flex-row gap-3 lg:w-[850px] relative z-20">
      
      {/* Search Input */}
      <div className="flex gap-2 items-center">
        <CiSearch />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:w-[280px] w-full py-2 px-4 outline-none text-sm"
          placeholder="Job title or keyword"
        />
      </div>

      {/* Location Select */}
      <div className="flex gap-2 items-center">
        <IoLocationOutline />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="lg:w-[280px] w-full outline-none text-sm bg-transparent cursor-pointer"
        >
          <option value="">Select location</option>
          <option value="remote">Remote</option>
          <option value="dhaka">Dhaka</option>
          <option value="florence">Florence, Italy</option>
          <option value="rome">Rome, Italy</option>
          <option value="milan">Milan, Italy</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[var(--brandColor)] cursor-pointer w-full text-center text-[var(--color-white)] px-7 py-4 text-sm"
      >
        Search my job
      </button>
    </div>
  );
}