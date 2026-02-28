"use client";

import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="cs-container py-5">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Image src="/images/Logo.png" height={36} width={152} alt="logo" />

          {/* Desktop menu */}
          <div className="hidden md:flex text-[16px] items-center gap-8 text-[var(--neutrals-80)]">
            <span className="cursor-pointer">Find Jobs</span>
            <span className="cursor-pointer">Browse Companies</span>
          </div>
        </div>

        {/* Right - Desktop */}
        <div className="hidden md:flex items-center gap-4 text-[16px]">
          <button className="text-[var(--brandColor)]">Login</button>
          <button className="bg-[var(--brandColor)] text-white px-5 py-2 rounded">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <IoMdClose /> : <Image src='/images/Icon.png' alt="menu" width={20} height={20}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-[16px] text-[var(--neutrals-80)]">
          <span className="cursor-pointer">Find Jobs</span>
          <span className="cursor-pointer">Browse Companies</span>

          <div className="flex gap-4 mt-2">
            <button className="text-[var(--brandColor)]">Login</button>
            <button className="bg-[var(--brandColor)] text-white px-5 py-2 rounded">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}