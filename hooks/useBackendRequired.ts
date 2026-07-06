"use client";

import { useContext } from "react";
import { BackendRequiredContext } from "@/context/BackendRequiredContext";

export function useBackendRequired() {
  const context = useContext(BackendRequiredContext);
  if (context === undefined) {
    throw new Error("useBackendRequired must be used within a BackendRequiredProvider");
  }
  return context;
}
