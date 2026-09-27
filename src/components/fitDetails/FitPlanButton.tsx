"use client";

import FitsContext from "@/context/FitsContext";
import { IFit } from "@/types/fits.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { FaRegCalendarPlus } from "react-icons/fa6";


interface FitsContextType {
  fitsPlan: IFit[];
  setFitsPlan: React.Dispatch<React.SetStateAction<IFit[]>>;
}

const FitPlanButton = ({ fitDetails }: { fitDetails: IFit }) => {
  // Cast to unknown first to resolve TS2352
  const context = useContext(
    FitsContext as unknown as React.Context<FitsContextType | undefined>,
  );

  const fitsPlan = context?.fitsPlan ?? [];
  const setFitsPlan = context?.setFitsPlan;

  const handleAddToPlan = () => {
    if (!setFitsPlan) {
      toast.error("FitsContext Provider is missing!");
      return;
    }

    const isAlreadyInPlan = fitsPlan.some((item) => item.id === fitDetails.id);
    if (isAlreadyInPlan) {
      toast.info(`"${fitDetails.name}" is already in your plan!`);
      return;
    }

    setFitsPlan([...fitsPlan, fitDetails]);
    toast.success(`Added "${fitDetails.name}" to today's plan`);
  };

  return (
    <button
      onClick={handleAddToPlan}
      className="flex gap-2 justify-between bg-[#ccff00] hover:bg-[#b3e600] text-black font-semibold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
    >
      <FaRegCalendarPlus className="w-3.75 h-3.75"/>
      <span>Add to today's plan</span>
    </button>
  );
};

export default FitPlanButton;
