"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

// Definindo o contexto
interface LoadingContextType {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Hook personalizado para utilizar o contexto
export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

// Componente provedor do contexto
interface LoadingProviderProps {
  children: ReactNode;
}
export function LoadingProvider({ children }: LoadingProviderProps) {
  const [refresh, setRefresh] = useState(false);

  return (
    <LoadingContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </LoadingContext.Provider>
  );
}
