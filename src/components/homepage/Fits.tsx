import React from "react";
import FitCard from "../shared/FitCard";
import { IFit } from "@/types/fits.type";

const getFits = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch fits data");
  }

  return (await res.json()) as IFit[];
};

const Fits = async () => {
  const fetchedFits = await getFits();

  return (
    <div className="bg-[#121212] text-white py-12 px-4 lg:px-12 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <h2
            id="library"
            className="text-2xl sm:text-3xl font-black font-mono tracking-wider uppercase"
          >
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(fetchedFits ?? []).map((fit) => (
            <FitCard key={fit.id} fit={fit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fits;
