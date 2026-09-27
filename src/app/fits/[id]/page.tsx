import React, { Suspense } from "react";
import Image from "next/image";
import FitPlanButton from "@/components/fitDetails/FitPlanButton";
import FitSaveButton from "@/components/fitDetails/FitSaveButton";

const getFitDetails = async (id: string) => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch fit details: ${res.status}`);
  }

  return res.json();
};
const FitDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const fitDetails = await getFitDetails(id);
  // console.log("Fetched Fit Details:", fitDetails);

  return (
    <Suspense
      fallback={
        <div>
          <span className="loading loading-spinner text-info"></span>Loading
          workouts…
        </div>
      }
    >
      <div className="min-h-screen bg-[#111319] text-white p-6 md:p-12 flex justify-center items-center">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side: Image */}
          <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-800">
            <Image
              src={fitDetails.image}
              alt={fitDetails.name}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side: Details Content */}
          <div className="flex flex-col space-y-6">
            {/* Title and Subtitle */}
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide uppercase text-white">
                {fitDetails.name}
              </h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                {fitDetails.description}
              </p>
            </div>

            {/* Muscle Tags */}
            <div className="flex space-x-2">
              {fitDetails.muscleGroups?.map((group: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-semibold text-xs px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Stats List Card */}
            <div className="bg-[#1a1d26] rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  EQUIPMENT
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.equipment}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  DIFFICULTY
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.difficulty}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  SETS
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.sets}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  REPS
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.reps}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  DURATION
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.duration} min
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800/60 pb-2">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  CALORIES
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-gray-500 font-semibold uppercase text-xs">
                  RATING
                </span>
                <span className="text-gray-200 font-medium">
                  {fitDetails.rating}
                </span>
              </div>
            </div>

            {/* Instructions Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                INSTRUCTIONS
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-gray-400 leading-relaxed">
                {fitDetails.instructions?.map(
                  (instruction: string, idx: number) => (
                    <li key={idx}>{instruction}</li>
                  ),
                )}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <FitPlanButton fitDetails={fitDetails} />

              <FitSaveButton fitDetails={fitDetails} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default FitDetailsPage;
