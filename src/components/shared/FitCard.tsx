import Image from "next/image";
import React from "react";
import { IFit } from "../../types/fits.type";
import Link from "next/link";

const FitCard = ({ fit }: { fit: IFit }) => {
  return (
    <Link href={`/fits/${fit.id}`}>
      <div
        key={fit.id}
        className="bg-[#17171a] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
      >
        <div className="relative w-full h-56 bg-zinc-900 flex items-center justify-center p-0">
          <Image
            src={fit.image}
            alt={fit.name}
            fill
            className="object-cover p-0 drop-shadow-lg"
          />
        </div>

        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {fit.muscleGroups?.map((group: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-[#1f2923] text-[#a3e635] font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black font-mono tracking-wide uppercase">
                {fit.name}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                {fit.equipment}
              </p>
            </div>
          </div>

          <div className="divider my-1 border-zinc-800"></div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{fit.duration} min</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{fit.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <span>{fit.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FitCard;
