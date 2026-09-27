"use client";

import FitsContext from "@/context/FitsContext";
import { IFit } from "@/types/fits.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { LiaSave } from "react-icons/lia";

interface FitsContextType {
  fitsLater: IFit[];
  setFitsLater: React.Dispatch<React.SetStateAction<IFit[]>>;
}

const FitSaveButton = ({ fitDetails }: { fitDetails: IFit }) => {
  // Cast to unknown first to resolve TS2352
  const context = useContext(
    FitsContext as unknown as React.Context<FitsContextType | undefined>,
  );

  const fitsLater = context?.fitsLater ?? [];
  const setFitsLater = context?.setFitsLater;

  const handleAddToSave = () => {
    if (!setFitsLater) {
      toast.error("FitsContext Provider is missing!");
      return;
    }

    const isAlreadySaved = fitsLater.some((item) => item.id === fitDetails.id);
    if (isAlreadySaved) {
      toast.info(`"${fitDetails.name}" is already saved for later!`);
      return;
    }

    setFitsLater([...fitsLater, fitDetails]);
    toast.success(`added plan "${fitDetails.name}" to saved list`);
  };

  return (
    <button
      onClick={handleAddToSave}
      className="justify-between border border-gray-700 hover:bg-gray-800 text-gray-300 font-semibold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
    >
      <LiaSave className="w-3.75 h-3.75" />

      <span>Save for later</span>
    </button>
  );
};

export default FitSaveButton;
