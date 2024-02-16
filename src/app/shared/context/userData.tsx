"use client"
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

interface UserData {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  contact: any;
  avatar: any;
  preferred_currency: string;
  plan: string;
  created_at: string;
  favorites: any[];
  projects: any[];
}

// Crie o contexto para os dados do usuário
const UserContext = createContext<UserData | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function getUserData() {
      try {
        if (status === "authenticated" && session?.accessToken) {
          const response = await axios.get<UserData>("https://codeui-api-production.up.railway.app/api/user", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
          console.log("sem autorização");
          try {
            const refreshResponse = await axios.post<{ refreshToken: string }>("https://codeui-api-production.up.railway.app/api/user/session/refresh", {}, {
              headers: {
                Authorization: `Bearer ${session?.accessToken}`
              },
            });

            if (refreshResponse.status === 200) {
              console.log("tokennovo", refreshResponse.data.refreshToken)
              const newAccessToken = refreshResponse.data.refreshToken;
              const newSession = { ...session, accessToken: newAccessToken };
              getUserData();
            } else {
                console.log("tokennovo", refreshResponse.data.refreshToken)
              console.error("Erro ao atualizar o token de acesso:", refreshResponse.statusText);
            }
          } catch (refreshError) {
            console.error("Erro ao atualizar o token de acesso catch:", refreshError);
          }
        } else {
          console.error("Erro ao obter os dados do usuário:", error);
        }
      }
    }
    getUserData();
  }, [status, session]);

  return (
    // Fornecer os dados do usuário para toda a aplicação através do contexto
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};
