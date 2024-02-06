"use client"
import { useEffect, useState } from "react";
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

export default function UseDataUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Função para obter os dados do usuário
    async function getUserData() {
      try {
        // Verifica se o usuário está autenticado e tem uma sessão
        if (status === "authenticated" && session?.accessToken) {
          // Faz a solicitação GET para obter os dados do usuário
          const response = await axios.get<UserData>("https://codeui-api-development.up.railway.app/api/user", {
            // Inclui o token de acesso no cabeçalho Authorization para autenticar a solicitação
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          // Define os dados do usuário no estado
          setUserData(response.data);
        }
      } catch (error) {
        // Verifica se o erro é devido a uma resposta com código de status 401
        if ((error as AxiosError)?.response?.status === 401) {
          console.log("sem autorização");

          // Atualiza o token de acesso
          try {
            const refreshResponse = await axios.post<{ refreshToken: string }>("https://codeui-api-development.up.railway.app/api/user/session/refresh", {}, {
              // Inclui o token de acesso atual no cabeçalho Authorization para autenticar a solicitação de atualização
              headers: {
                Authorization: `Bearer ${session?.accessToken}`
              },
            });

            if (refreshResponse.status === 200) {
              console.log("tokennovo", refreshResponse.data.refreshToken)
              const newAccessToken = refreshResponse.data.refreshToken;
              const newSession = { ...session, accessToken: newAccessToken };

              // Chama novamente a função para obter os dados do usuário usando o novo token de acesso
              getUserData();
            } else {
                console.log("tokennovo", refreshResponse.data.refreshToken)
              console.error("Erro ao atualizar o token de acesso:", refreshResponse.statusText);
            }
          } catch (refreshError) {
            console.error("Erro ao atualizar o token de acesso catch:", refreshError);
          }
        } else {
          // Se não for 401, trata o erro normalmente
          console.error("Erro ao obter os dados do usuário:", error);
        }
      }
    }

    // Chama a função para obter os dados do usuário ao montar o componente
    getUserData();
  }, [status, session]);

  return (
    <div>
      {/* Renderiza os dados do usuário */}
      {userData && (
        <>
          <h2>Dados do usuário</h2>
          <p>ID: {userData.id}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Preferred Currency: {userData.preferred_currency}</p>
          <p>Plan: {userData.plan}</p>
          <p>Created At: {userData.created_at}</p>
          {/* Adicione outras propriedades do usuário conforme necessário */}
        </>
      )}
    </div>
  );
}
