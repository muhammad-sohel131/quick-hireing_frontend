import Image from "next/image";
import { CiInstagram } from "react-icons/ci";
import { FaDribbble, FaFacebook, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="cs-container py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Image src="/images/footerLogo.png" height={36} width={152} alt="logo" />
          <p className="text-[16px] mt-4 text-[var(--neutrals-20)]">
            Great platform for the job seeker that passionate about startups. Find your dream job easier.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
        <div>
          <h4 className="font-semibold text-lg mb-4">About</h4>
          <ul className="space-y-2 text-[16px] text-[var(--neutrals-20)]">
            <li>Companies</li>
            <li>Pricing</li>
            <li>Advice</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-lg">Resources</h4>
          <ul className="space-y-2 text-[16px] text-[var(--neutrals-20)]">
            <li>Help Docs</li>
            <li>Guide</li>
            <li>Updates</li>
            <li>Contact Us</li>
          </ul>
        </div>
 </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">Get job notifications</h4>
          <p className="text-[16px] mt-4 text-[var(--neutrals-20)] mb-6">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="flex-1 px-5 py-4 text-black bg-white text-sm"
              placeholder="Email address"
            />
            <button className="bg-[var(--brandColor)] px-5 py-4 text-lg font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-2 cs-container border-white opacity-10" />
      {/* Copyright */}
      <div className="cs-container py-6 flex flex-col md:flex-row items-center justify-between text-md text-[var(--neutrals-20)]">
        <p>2021 @ QuickHire. All rights reserved.</p>

        {/* Social icons placeholder */}
        <div className="flex gap-4 mt-4 md:mt-0 text-white">
          <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center">
           <FaFacebookF />
          </div>
          <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center">
           <CiInstagram />
          </div>
          <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center">
           <FaDribbble />
          </div>
          <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center">
           <FaLinkedinIn />
          </div>
          <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF1A] flex justify-center items-center">
           <FaTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
}