"use client";

import { IFit } from "@/types/fits.type";
import React, { createContext, ReactNode, Suspense, useState } from "react";

export const FitsContext = createContext({});

export const FitsProvider = ({ children }: { children: ReactNode }) => {
  const [fitsPlan, setFitsPlan] = useState<IFit[]>([]);
  const [fitsLater, setFitsLater] = useState([]);

  const sharedData = {
    fitsPlan: fitsPlan,
    setFitsPlan: setFitsPlan,
    fitsLater: fitsLater,
    setFitsLater: setFitsLater,
  };

  return (
    <Suspense
      fallback={
        <div>
          <span className="loading loading-spinner text-info"></span>Loading
          workouts…
        </div>
      }
    >
      <FitsContext.Provider value={sharedData}>{children}</FitsContext.Provider>
    </Suspense>
  );
};

export default FitsContext;
