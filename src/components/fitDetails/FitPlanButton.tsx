"use client";

import FitsContext from "@/context/FitsContext";
import { IFit } from "@/types/fits.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const FitPlanButton = ({ fitDetails }: { fitDetails: IFit }) => {
  const { fitsPlan, setFitsPlan } = useContext(FitsContext);

  const handleAddToPlan = () => {
    // console.log("add to plan btn triggered", fitDetails);

    setFitsPlan([...fitsPlan, fitDetails]);

    toast.success(`You have added "${fitDetails.name}" plan to new Plan!`);
  };

  return (
    <button
      onClick={() => handleAddToPlan()}
      className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-semibold text-xs px-5 py-3 rounded-xl transition-colors"
    >
      Add to Plan
    </button>
  );
};



export default FitPlanButton;
