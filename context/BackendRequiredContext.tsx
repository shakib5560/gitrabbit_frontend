"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";
import { BackendRequiredModal } from "@/components/backend-required-modal";

interface BackendRequiredContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const BackendRequiredContext = createContext<BackendRequiredContextType | undefined>(undefined);

export function BackendRequiredProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BackendRequiredContext.Provider value={{ isOpen, open, close }}>
      {children}
      <BackendRequiredModal isOpen={isOpen} onClose={close} />
    </BackendRequiredContext.Provider>
  );
}
