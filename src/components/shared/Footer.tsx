import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#111318] border-t border-gray-800/80 py-6 px-6 md:px-12">
      <div className="max-w-9xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-2 group">
          {/* Dumbbell Icon */}
          <div className="text-[#ccff00]">
            <svg
              className="w-5 h-5 transform -rotate-45"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 5a1 1 0 011 1v1h10V6a1 1 0 112 0v2a1 1 0 01-1 1h-1v6h1a1 1 0 011 1v2a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-2a1 1 0 011-1h1V9H6a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </svg>
          </div>
          <span className="font-black text-white text-base tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        {/* Copyright & Tagline */}
        <p className="text-gray-400 text-xs tracking-wide text-center sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
