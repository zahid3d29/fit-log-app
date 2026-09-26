// "use client";

// import FitsContext from "@/context/FitsContext";
// import React, { useContext } from "react";

// interface FitsContextType {
//   fitsPlan: unknown[];
// }

// const ListedFits = () => {
//   const { fitsPlan, fitsLater } = useContext(FitsContext) as FitsContextType;

//   // console.log(fitsPlan,fitsLater, "Fits Plan", "fits Later");
//   return <div>
//     listed Fits | Total Listed Books: { fitsPlan.length } <br/> | Total saved Plan: { fitsLater.length }
//   </div>;
// };

// export default ListedFits;

"use client";

import { FitsContext } from "@/context/FitsContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";



interface Fit {
  id: string;
  title: string;
  image?: string;
  equipment?: string;
  duration: number;
  calories: number;
  rating?: number;
  completed?: boolean;
}

interface FitsContextType {
  fitsPlan: Fit[];
  fitsLater: Fit[];
}

const ListedFits = () => {
  const { fitsPlan, fitsLater } = useContext(FitsContext) as FitsContextType;

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [sortBy, setSortBy] = useState<"duration" | "calories" | "title">(
    "duration",
  );

  // Filter the list based on the active tab
  const filteredList = activeTab === "today" ? fitsPlan : fitsLater;

  // Sort the filtered list based on the selected sort option
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    } else if (sortBy === "calories") {
      return a.calories - b.calories;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Calculate total stats
  const totalExercises = filteredList.length;
  const totalMinutes = filteredList.reduce(
    (sum, item) => sum + item.duration,
    0,
  );
  const totalCalories = filteredList.reduce(
    (sum, item) => sum + item.calories,
    0,
  );

  const handleRemove = (id: string) => {
    if (activeTab === "today") {
      const updatedPlan = fitsPlan.filter((item) => item.id !== id);
      // Update the context state for fitsPlan
      // setFitsPlan(updatedPlan);
    } else {
      const updatedSaved = fitsLater.filter((item) => item.id !== id);
      // Update the context state for fitsLater
      // setFitsLater(updatedSaved);
    }
  };

  const handleToggleDone = (id: string) => {
    const updatedList = filteredList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );

    if (activeTab === "today") {
      // setFitsPlan(updatedList);
    } else {
      // setFitsLater(updatedList);
    }
  };

  return (
    <div className="min-h-screen bg-[#111318] text-white p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Dynamic Stats Banner */}
        <div className="bg-[#181a20] border border-gray-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-semibold tracking-wide block">
              Exercises
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#ccff00]">
              {totalExercises}
            </span>
          </div>

          <div className="space-y-1 border-l border-gray-800/60 pl-6">
            <span className="text-gray-400 text-xs font-semibold tracking-wide block">
              Minutes
            </span>
            <span className="text-4xl sm:text-5xl font-black text-white">
              {totalMinutes}
            </span>
          </div>

          <div className="space-y-1 border-l border-gray-800/60 pl-6">
            <span className="text-gray-400 text-xs font-semibold tracking-wide block">
              Calories
            </span>
            <span className="text-4xl sm:text-5xl font-black text-white">
              {totalCalories}
            </span>
          </div>
        </div>

        {/* Tab & Sort Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          {/* Tabs */}
          <div className="bg-[#181a20] p-1 rounded-xl border border-gray-800/80 flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "today"
                  ? "bg-[#232730] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "saved"
                  ? "bg-[#232730] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort Select Dropdown */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <span className="text-xs text-gray-400 font-medium">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "duration" | "calories" | "title")
                }
                className="bg-[#181a20] border border-gray-800 text-white text-xs font-medium px-4 py-2 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="title">Name</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        {sortedList.length > 0 ? (
          /* Cards List View */
          <div className="space-y-4">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="bg-[#181a20] border border-gray-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-gray-700"
              >
                {/* Item Details */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {item.equipment || "No equipment"}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-300 pt-0.5">
                      <span className="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>{item.duration} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🔥</span>
                        <span>{item.calories || 0} kcal</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span>{item.rating || 4.5}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="bg-[#21252e] hover:bg-[#2b303c] border border-gray-700/60 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>

                  {/* "Mark as Done" button only visible on "Today's Plan" tab */}
                  {activeTab === "today" && (
                    <button
                      onClick={() => handleToggleDone(item.id)}
                      className={`font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors ${
                        item.completed
                          ? "bg-gray-700 text-gray-300"
                          : "bg-[#ccff00] hover:bg-[#b3e600] text-black"
                      }`}
                    >
                      <span>✓</span>
                      <span>{item.completed ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-500 hover:text-white text-lg p-1 transition-colors"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State View */
          <div className="border border-dashed border-gray-800/80 rounded-2xl p-12 min-h-[350px] flex items-center justify-center bg-[#14161d]/50">
            <div className="text-center space-y-3 max-w-sm mx-auto">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">
                NOTHING HERE YET
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Browse the library and add a lift to get today moving.
              </p>
              <div className="pt-2">
                <Link
                  href="/workouts"
                  className="inline-block bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs px-6 py-3 rounded-full transition-colors"
                >
                  Go to workouts
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListedFits;
