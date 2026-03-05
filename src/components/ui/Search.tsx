import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div className="mt-6 bg-white lg:p-3 flex flex-col justify-between lg:flex-row gap-3 lg:w-[850px] relative z-20">
      <div className="flex gap-2 items-center">
        <CiSearch />
        <input
          className="lg:w-[280px] w-full outline-none text-sm"
          placeholder="Job title or keyword"
        />
      </div>
      <div className="flex gap-2 items-center">
        <IoLocationOutline />
        <select className="lg:w-[280px] w-full outline-none text-sm bg-transparent cursor-pointer">
          <option value="">Select location</option>
          <option value="florence">Florence, Italy</option>
          <option value="rome">Rome, Italy</option>
          <option value="milan">Milan, Italy</option>
        </select>
      </div>
      <button className="bg-[var(--brandColor)] w-full text-center text-[var(--color-white)] px-7 py-4 text-sm">
        Search my job
      </button>
    </div>
  );
}
