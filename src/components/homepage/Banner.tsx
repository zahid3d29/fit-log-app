import React from 'react';
import Link from "next/link";
import Image from "next/image";
import BannerImg from '@/assets/banner.png';

const Banner = () => {
return (
  <div className="bg-[#121212] px-4 lg:px-12 py-6">
    <div className="hero bg-[#17171a] text-white py-12 lg:py-20 px-6 lg:px-12 rounded-3xl border border-zinc-800/80 shadow-2xl max-w-9xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full max-w-6xl mx-auto p-0 gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
            <Image
              src={BannerImg}
              width="334"
              alt="Workout Machine"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6 text-left">
          <span className="text-[#a3e635] text-xs sm:text-sm font-bold tracking-widest uppercase">
            Workout Library
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase font-mono">
            Train with intent. <br className="hidden sm:inline" /> Log every
            set.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <div>
            <Link
              href="/workouts"
              className="btn bg-[#a3e635] hover:bg-[#8acc2b] text-black font-bold border-none px-8 py-3 rounded-xl tracking-wide uppercase text-sm shadow-lg"
            >
              Browse Workouts
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Banner;