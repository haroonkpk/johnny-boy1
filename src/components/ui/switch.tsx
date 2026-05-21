"use client";

import * as React from "react";
import Button from "./Button";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onCheckedChange, disabled = false }: SwitchProps) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) onCheckedChange(!checked);
      }}
      className={`
        relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        ${checked ? "bg-emerald-500" : "bg-gray-200"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm 
          ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-4.5" : "translate-x-0.5"}
        `}
      />
    </Button>
  );
}