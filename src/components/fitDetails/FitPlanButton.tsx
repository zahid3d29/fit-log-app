"use client";

import FitsContext from "@/context/FitsContext";
import { IFit } from "@/types/fits.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { FaRegCalendarPlus } from "react-icons/fa";

interface FitsContextType {
  fitsPlan: IFit[];
  setFitsPlan: React.Dispatch<React.SetStateAction<IFit[]>>;
}

const FitPlanButton = ({ fitDetails }: { fitDetails: IFit }) => {
  const context = useContext(
    FitsContext as unknown as React.Context<FitsContextType | undefined>,
  );

  const fitsPlan = context?.fitsPlan ?? [];
  const setFitsPlan = context?.setFitsPlan;

  const isCapReached = fitsPlan.length >= 5;
  const isAlreadyInPlan = fitsPlan.some((item) => item.id === fitDetails.id);

  const handleAddToPlan = () => {
    if (!setFitsPlan) {
      toast.error("FitsContext Provider is missing!");
      return;
    }

    if (isAlreadyInPlan) {
      toast.info(`"${fitDetails.name}" is already in today's plan!`);
      return;
    }

    if (isCapReached) {
      toast.error(
        "Maximum 5 lifts allowed for today. Complete some before adding more!",
      );
      return;
    }

    setFitsPlan([...fitsPlan, fitDetails]);
    toast.success(`You have added "${fitDetails.name}" to today's plan!`);
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={isCapReached || isAlreadyInPlan}
      className={`font-semibold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
        isAlreadyInPlan
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : isCapReached
            ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
            : "bg-[#ccff00] hover:bg-[#b3e600] text-black cursor-pointer"
      }`}
    >
      {!isAlreadyInPlan && !isCapReached && (
        <FaRegCalendarPlus className="w-[15px] h-[15px]" />
      )}
      <span>
        {isAlreadyInPlan
          ? "In Plan"
          : isCapReached
            ? "Plan Full (5/5)"
            : "Add to today's Plan"}
      </span>
    </button>
  );
};

export default FitPlanButton;
