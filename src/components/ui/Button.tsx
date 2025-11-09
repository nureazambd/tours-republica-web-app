"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-[Rubik]";

  const variants = {
    primary:
      "bg-[#EE2552] text-white hover:bg-[#d71e48] focus:ring-[#EE2552]",
    secondary:
      "bg-[#F4F7F9] text-[#003459] hover:bg-[#E9EDF2] focus:ring-[#003459]",
    outline:
      "border border-[#003459] text-[#003459] bg-transparent hover:bg-[#003459] hover:text-white focus:ring-[#003459]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-[56px] py-[16px] text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
