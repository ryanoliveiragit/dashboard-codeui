"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definindo os tipos para o contexto de loading
interface LoadingContextData {
  loading: boolean;
  setLoadingWithTimeout: () => void;
}

// Criando o contexto de loading
const LoadingContext = createContext<LoadingContextData | undefined>(undefined);

// Hook personalizado para acessar o contexto de loading
export const useLoading = (): LoadingContextData => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading deve ser utilizado dentro de um LoadingProvider');
  }
  return context;
};

// Props do provedor do contexto de loading
interface LoadingProviderProps {
  children: ReactNode;
}

// Provedor do contexto de loading
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined); // Armazena o identificador do timeout

  // Função para setar loading como true e depois de 2 segundos setar como false
  const setLoadingWithTimeout = () => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos
    setTimeoutId(id); // Armazena o identificador do timeout
  };

  // Limpa o timeout quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const value: LoadingContextData = {
    loading,
    setLoadingWithTimeout,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
