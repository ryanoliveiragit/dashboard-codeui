"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Certifique-se de instalar o pacote js-cookie
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export interface UserData {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  contact: string;
  avatar: string;
  preferred_currency: string;
  created_at: string;
}

export const useUserProfile = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial
  const { toast } = useToast();
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      axios
        .get("https://codeui-api-production.up.railway.app/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
          },
        })
        .then((response) => {
          setData(response.data);
          setLoading(false); // Definir o carregamento como falso após a conclusão da requisição
        })
        .catch((err) => {
          setError(err.message);

          toast({
            variant: "destructive",
            title: "Processo não conclúido",
            description: `Erro: Sem autorização (Por favor relogue)`,
          });

          setLoading(false); // Definir o carregamento como falso em caso de erro
        });
    }
  }, []); // Adicione setData e setError como dependências do useEffect para evitar avisos do ESLint

  return { data, loading, error };
};
