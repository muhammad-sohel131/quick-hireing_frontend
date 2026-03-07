"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth()

  return (
    <nav className="bg-[#F8F8FD]">
      <div className="flex cs-container py-5 items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image src="/images/Logo.png" height={36} width={152} alt="logo" />
          </Link>

          {/* Desktop menu */}
          <div className="hidden font-medium md:flex text-[16px] items-center gap-8 text-[var(--neutrals-80)]">
            <Link href="/jobs" className="cursor-pointer">
              Find Jobs
            </Link>
            <span className="cursor-pointer">Browse Companies</span>
          </div>
        </div>

        {/* Right - Desktop */}
        {user ? <><Link href="/admin" className="bg-[var(--brandColor)] text-white px-5 py-2 rounded font-bold">Dashboard</Link></> : <><div className="hidden md:flex items-center gap-4 text-[16px]">
          <Link href="/admin" className="text-[var(--brandColor)] font-bold">Login</Link>
          <button className="bg-[var(--brandColor)] text-white px-5 py-2 font-bold">
            Sign Up
          </button>
        </div></>}


        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl p-2 hover:bg-[var(--neutrals-20)] bg-white rounded-full transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <IoMdClose className="text-[var(--brandColor)]" />
          ) : (
            <Image src="/images/Icon.png" alt="menu" width={20} height={20} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 bg-[#F8F8FD] shadow-lg border-t border-[var(--neutrals-30)] z-50">
          <div className="cs-container py-6 flex flex-col gap-4 text-[16px] text-[var(--neutrals-80)]">
            <Link
              href="/jobs"
              className="cursor-pointer py-3 px-4 hover:bg-[var(--neutrals-20)] rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Find Jobs
            </Link>

            <span
              className="cursor-pointer py-3 px-4 hover:bg-[var(--neutrals-20)] rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Browse Companies
            </span>

            <div className="border-t border-[var(--neutrals-30)] my-2"></div>

            {user ? <><Link
              href="/admin"
              className="text-[var(--brandColor)] font-medium py-2 text-center border border-[var(--brandColor)] rounded-lg hover:bg-[var(--brandColor)] hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link></> : <>
              <div className="flex flex-col gap-3 px-4">
                <Link
                  href="/admin"
                  className="text-[var(--brandColor)] font-medium py-2 text-center border border-[var(--brandColor)] rounded-lg hover:bg-[var(--brandColor)] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>

                <button
                  className="bg-[var(--brandColor)] text-white py-2 rounded-lg font-medium hover:bg-[var(--foreground)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </>}
          </div>
        </div>
      )}
    </nav>
  );
}