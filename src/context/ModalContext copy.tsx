"use client";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  isManageBookingOpen: boolean;
  openManageBooking: () => void;
  closeManageBooking: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isManageBookingOpen,
        openManageBooking: () => setIsManageBookingOpen(true),
        closeManageBooking: () => setIsManageBookingOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside ModalProvider");
  return context;
};
