"use client";

import FitsContext from "@/context/FitsContext";
import { IFit } from "@/types/fits.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const FitSaveButton = ({ fitDetails }: { fitDetails: IFit }) => {
  const { fitsLater, setFitsLater } = useContext(FitsContext);

  const handleAddToSave = () => {
    // console.log("add to plan btn triggered", fitDetails);

    setFitsLater([...fitsLater, fitDetails]);
    toast.success(`You have added "${fitDetails.name}" plan to save list`);
  };

  return (

    <button  onClick={() => handleAddToSave()} className="border border-gray-700 hover:bg-gray-800 text-gray-300 font-semibold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 transition-colors">
              <span>🔖</span>
              <span>Save for later</span>
            </button>
  );
};

export default FitSaveButton;
