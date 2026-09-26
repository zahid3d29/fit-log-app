"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "@/assets/logo.png";
import { FitsContext } from "@/context/FitsContext";

interface FitsContextType {
  fitsPlan: unknown[];
  fitsLater: unknown[];
}

const Navbar = () => {
  const { fitsPlan, fitsLater } = useContext(FitsContext) as FitsContextType;
  return (
    <div className="navbar bg-[#121212] text-white px-4 lg:px-12 py-3 shadow-md">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo} width="28" alt="logo" />
          <span className="text-xl font-black tracking-wider text-white font-mono">
            FITLOG
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 items-center">
          <li>
            <Link
              href="/"
              className="bg-[#1f2923] text-[#a3e635] font-medium px-5 py-2 rounded-full hover:bg-[#1f2923]"
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/listed-fits"
              className="text-zinc-400 hover:text-white font-medium px-5 py-2 rounded-full"
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1a1a1a] px-3.5 py-1.5 rounded-full border border-zinc-800">
            <Link href="/listed-fits">
              <span className="text-xs font-semibold text-zinc-300">Plan </span>
              <span className="bg-[#a3e635] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {fitsPlan.length}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 bg-[#1a1a1a] px-3.5 py-1.5 rounded-full border border-zinc-800">
            <Link href="/listed-fits">
              <span className="text-xs font-semibold text-zinc-300">Saved</span>
              <span className="bg-[#27272a] text-zinc-300 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-zinc-700">
                {fitsLater.length}
              </span>
            </Link>
          </div>
        </div>

        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-[#1e1e1e] rounded-box w-64 space-y-3 border border-zinc-800"
          >
            <li>
              <Link
                href="/"
                className="bg-[#1f2923] text-[#a3e635] font-medium py-2.5 text-sm"
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/listed-fits"
                className="text-zinc-300 hover:text-white font-medium py-2.5 text-sm"
              >
                My Plan
              </Link>
            </li>
            <div className="divider my-1 border-zinc-800"></div>
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-zinc-800">
                <Link href="/listed-fits">
                  <span className="text-xs font-semibold text-zinc-300">
                    Plan
                  </span>
                  <span className="bg-[#a3e635] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {fitsPlan.length}
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-zinc-800">
                <Link href="/listed-fits">
                  <span className="text-xs font-semibold text-zinc-300">
                    Saved
                  </span>
                  <span className="bg-[#27272a] text-zinc-300 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-zinc-700">
                    {fitsLater.length}
                  </span>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
