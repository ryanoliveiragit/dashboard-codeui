import axios from "axios";
import { useState, useEffect } from "react";

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

export const useUserProfile = (userId: string) => {
  const [data, setData] = useState<UserData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserData>(`http://localhost:3000/user/${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchData();
  }, []); // Executa sempre que o ID do usuário mudar

  return data;
};
