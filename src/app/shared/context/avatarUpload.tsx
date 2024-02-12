"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface UploadAvatarContextData {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Criando o contexto de loading
const UploadAvatarContext = createContext<UploadAvatarContextData | undefined>(undefined);

// Hook personalizado para acessar o contexto de upload de avatar
export const useUploadAvatarContext = () => {
  const context = useContext(UploadAvatarContext);
  if (!context) {
    throw new Error("useUploadAvatarContext deve ser utilizado dentro de um UploadAvatarProvider");
  }
  return context;
};

// Props do provedor do contexto de upload de avatar
interface UploadAvatarProviderProps {
  children: ReactNode;
}

export const UploadAvatarProvider = ({ children }: UploadAvatarProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <UploadAvatarContext.Provider value={{ loading, setLoading }}>
      {children}
    </UploadAvatarContext.Provider>
  );
};
