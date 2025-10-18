"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Traveler {
  adults: number;
  children: number;
  total: number;
  date: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  pickup: string;
}

interface BookingContextType {
  booking: Traveler | null;
  setBooking: (data: Traveler) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBookingData] = useState<Traveler | null>(null);

  const setBooking = (data: Traveler) => setBookingData(data);
  const clearBooking = () => setBookingData(null);

  return (
    <BookingContext.Provider value={{ booking, setBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
