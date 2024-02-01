import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
  favorites: any,
  [key: string]: string;
}

export const useUserProfile = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserData = () => {
    const token = Cookies.get("auth_token");
    if (token) {
      axios
        .get("https://codeui-api-development.up.railway.app/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchUserData(); // Chama a função uma vez quando o componente é montado
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(fetchUserData, 10000); // Atualiza a cada 10 segundos
  //   return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  // }, []);



  return { data, loading, setLoading, error, fetchUserData };
};
