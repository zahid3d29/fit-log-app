"use client";

import React, { createContext, useEffect, useState } from "react";
import { IFit } from "@/types/fits.type";

interface FitsContextType {
  fitsPlan: IFit[];
  fitsLater: IFit[];
  setFitsPlan: React.Dispatch<React.SetStateAction<IFit[]>>;
  setFitsLater: React.Dispatch<React.SetStateAction<IFit[]>>;
}

export const FitsContext = createContext<FitsContextType | undefined>(
  undefined,
);

export const FitsProvider = ({ children }: { children: React.ReactNode }) => {
  const [fitsPlan, setFitsPlan] = useState<IFit[]>([]);
  const [fitsLater, setFitsLater] = useState<IFit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client-side mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitsPlan");
      const storedLater = localStorage.getItem("fitsLater");

      if (storedPlan) setFitsPlan(JSON.parse(storedPlan));
      if (storedLater) setFitsLater(JSON.parse(storedLater));
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync fitsPlan to localStorage when updated
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitsPlan", JSON.stringify(fitsPlan));
    }
  }, [fitsPlan, isLoaded]);

  // Sync fitsLater to localStorage when updated
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitsLater", JSON.stringify(fitsLater));
    }
  }, [fitsLater, isLoaded]);

  return (
    <FitsContext.Provider
      value={{ fitsPlan, fitsLater, setFitsPlan, setFitsLater }}
    >
      {children}
    </FitsContext.Provider>
  );
};

export default FitsContext;

// "use client";

// import { IFit } from "@/types/fits.type";
// import React, { createContext, ReactNode, Suspense, useState } from "react";

// export const FitsContext = createContext({});

// export const FitsProvider = ({ children }: { children: ReactNode }) => {
//   const [fitsPlan, setFitsPlan] = useState<IFit[]>([]);
//   const [fitsLater, setFitsLater] = useState([]);

//   const sharedData = {
//     fitsPlan: fitsPlan,
//     setFitsPlan: setFitsPlan,
//     fitsLater: fitsLater,
//     setFitsLater: setFitsLater,
//   };

//   return (
//     <Suspense
//       fallback={
//         <div>
//           <span className="loading loading-spinner text-info"></span>Loading
//           workouts…
//         </div>
//       }
//     >
//       <FitsContext.Provider value={sharedData}>{children}</FitsContext.Provider>
//     </Suspense>
//   );
// };

// export default FitsContext;
