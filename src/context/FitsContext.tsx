"use client";

import { IFit } from "@/types/fits.type";
import React, { createContext, ReactNode, useState } from "react";

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
    <FitsContext.Provider value={sharedData}>{children}</FitsContext.Provider>
//     <FitsContext.Provider value={{ fitsPlan, setFitsPlan }}>
//   {children}
// </FitsContext.Provider>
  );
};

export default FitsContext;
