"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isManageBookingOpen: boolean;
  openManageBooking: () => void;
  closeManageBooking: () => void;

  isSuccessOpen: boolean;
  openSuccess: () => void;
  closeSuccess: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isManageBookingOpen, setManageBookingOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isManageBookingOpen,
        openManageBooking: () => setManageBookingOpen(true),
        closeManageBooking: () => setManageBookingOpen(false),

        isSuccessOpen,
        openSuccess: () => setSuccessOpen(true),
        closeSuccess: () => setSuccessOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};
