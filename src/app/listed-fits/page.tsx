"use client";

import { FitsContext } from "@/context/FitsContext";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";



interface Fit {
  id: string;
  name: string;
  image: string;
  description: string;
  date: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  muscleGroups: string[];
  equipment: string;
  completed?: boolean;
}

interface FitsContextType {
  fitsPlan: Fit[];
  fitsLater: Fit[];
  setFitsPlan: React.Dispatch<React.SetStateAction<Fit[]>>;
  setFitsLater: React.Dispatch<React.SetStateAction<Fit[]>>;
}

const ListedFits = () => {
  const context = useContext(
    FitsContext as unknown as React.Context<FitsContextType | undefined>,
  );

  const fitsPlan = context?.fitsPlan ?? [];
  const fitsLater = context?.fitsLater ?? [];
  const setFitsPlan = context?.setFitsPlan;
  const setFitsLater = context?.setFitsLater;

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "title">(
    "duration",
  );

  // Filter list by active tab and search query (matches name, equipment, or muscle tags)
  const baseList = activeTab === "today" ? fitsPlan : fitsLater;

  const filteredList = baseList.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchesName = item.name.toLowerCase().includes(query);
    const matchesEquipment = item.equipment?.toLowerCase().includes(query);
    const matchesMuscles = item.muscleGroups?.some((muscle) =>
      muscle.toLowerCase().includes(query),
    );

    return matchesName || matchesEquipment || matchesMuscles;
  });

  // Sort list
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "caloriesBurned") return a.caloriesBurned - b.caloriesBurned;
    return a.name.localeCompare(b.name);
  });

  // Dynamic stats
  const totalExercises = baseList.length;
  const totalMinutes = baseList.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = baseList.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0,
  );

  const handleRemove = (id: string) => {
    const targetItem = baseList.find((item) => item.id === id);
    if (activeTab === "today") {
      setFitsPlan?.((prev) => prev.filter((item) => item.id !== id));
      toast.info(
        `Removed "${targetItem?.name || "Workout"}" from today's plan.`,
      );
    } else {
      setFitsLater?.((prev) => prev.filter((item) => item.id !== id));
      toast.info(`Removed "${targetItem?.name || "Workout"}" from saved list.`);
    }
  };

  const handleToggleDone = (id: string) => {
    const targetItem = fitsPlan.find((item) => item.id === id);
    const isNowCompleted = !targetItem?.completed;

    setFitsPlan?.((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: isNowCompleted } : item,
      ),
    );

    if (isNowCompleted) {
      toast.success(`🎉 Great job! Marked "${targetItem?.name}" as completed!`);
    } else {
      toast.info(`Unmarked "${targetItem?.name}".`);
    }
  };

  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <div className="min-h-screen bg-[#111318] text-white p-6 sm:p-10 font-sans">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-white">
              MY PLAN
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Cap of five lifts for today ({totalExercises}/5). Finish them,
              then load more.
            </p>
          </div>

          {/* Stats Banner */}
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

          {/* Navigation, Search & Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
            {/* Tabs */}
            <div className="bg-[#181a20] p-1 rounded-xl border border-gray-800/80 flex items-center space-x-1 shrink-0">
              <button
                onClick={() => setActiveTab("today")}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "today"
                    ? "bg-[#232730] text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Today's Plan ({fitsPlan.length})
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "saved"
                    ? "bg-[#232730] text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Saved ({fitsLater.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by name, tag, or equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181a20] border border-gray-800 text-white text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-gray-600 placeholder-gray-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs text-gray-400 font-medium">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "duration" | "caloriesBurned" | "title",
                    )
                  }
                  className="bg-[#181a20] border border-gray-800 text-white text-xs font-medium px-4 py-2 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="duration">Duration</option>
                  <option value="caloriesBurned">Calories</option>
                  <option value="title">Name</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Cards List View */}
          {sortedList.length > 0 ? (
            <div className="space-y-4">
              {sortedList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181a20] border border-gray-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                      <Image
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {item.equipment || "No equipment"}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-300 pt-0.5">
                        <span className="flex justify-between  gap-1 text-gray-400">
                          <MdOutlineWatchLater />
                          {item.duration} min
                        </span>
                        <span className="flex justify-between gap-1 text-gray-400">
                          <FaFireAlt />
                          {item.caloriesBurned || 0} kcal
                        </span>
                        <span className="flex justify-between gap-1 text-gray-400">
                          <FaRegStar />
                          {item.rating || 4.5}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <Link
                      href={`/fits/${item.id}`}
                      className="bg-[#21252e] hover:bg-[#2b303c] border border-gray-700/60 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => handleToggleDone(item.id)}
                        className={`font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer ${
                          item.completed
                            ? "bg-gray-700 text-gray-300"
                            : "bg-[#ccff00] hover:bg-[#b3e600] text-black"
                        }`}
                      >
                        <span>✓</span>
                        <span>{item.completed ? "Done" : "Mark as Done"}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-500 hover:text-white text-lg p-1 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-800/80 rounded-2xl p-12 min-h-[300px] flex items-center justify-center bg-[#14161d]/50">
              <div className="text-center space-y-3 max-w-sm mx-auto">
                <h2 className="text-lg font-black uppercase tracking-wider text-white">
                  {searchQuery ? "NO MATCHES FOUND" : "NOTHING HERE YET"}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {searchQuery
                    ? `No workouts found matching "${searchQuery}". Try a different keyword.`
                    : "Browse the library and add a lift to get today moving."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default ListedFits;