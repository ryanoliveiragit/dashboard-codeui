"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
  favorites: any;
  [key: string]: string;
}

export const useUserProfile = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("auth_token");
      
      if (token) {
        try {
          const response = await axios.get("https://codeui-api-production.up.railway.app/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          setLoading(false);
        } catch (err: any) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError("Erro desconhecido ao buscar dados do usuário.");
          }
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  return { data, loading, error };
};
