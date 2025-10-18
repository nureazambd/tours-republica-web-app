"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  date: string;
  time: string;
  guests: number;
}

interface TourContextType {
  selectedTour: Tour | null;
  setSelectedTour: (tour: Tour) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return (
    <TourContext.Provider value={{ selectedTour, setSelectedTour }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTourContext must be used within TourProvider");
  return context;
};
