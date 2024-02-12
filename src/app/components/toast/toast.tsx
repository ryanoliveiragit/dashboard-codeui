"use client"
import React, { useState, useEffect } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

export function ToastDemo() {
  const { toast } = useToast();
  const [showIcon, setShowIcon] = useState(true);
  const pathname = usePathname();
  const [toastDescription, setToastDescription] = useState<string>("");
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Função assíncrona para verificar se o item é favorito
    const checkIfFavorite = async () => {
      try {
        const parts = pathname.split("/");
        const lastPart = parts[parts.length - 1];

        if (session) {
          const response = await axios.get(
            `https://codeui-api-production.up.railway.app/api/user/favorite/${lastPart}`,
            {
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
              },
            }
          );
          setIsFavorite(response.data.isFavorite);
        }
      } catch (error) {
        console.error("Erro ao verificar favorito:", error);
      }
    };

    checkIfFavorite();
  }, [session, pathname]);

  const handleButtonClick = async () => {
    try {
      const parts = pathname.split("/");
      const lastPart = parts[parts.length - 1];

      const response = await axios.post(
        "https://codeui-api-production.up.railway.app/api/user/favorite",
        {
          name: lastPart,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      handleToast("adicionou");
      console.log(response.data);
    } catch (error) {
      toast({
        title: `${error}`,
        action: (
          <ToastAction altText="Fechar Notificação">Fechar</ToastAction>
        ),
      });

    }
  };

  const handleToast = (action: string) => {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    setToastDescription(lastPart);

    setShowIcon(false);
    toast({
      title: `Usuario ${action} ${lastPart} como favorito`,
      action: (
        <ToastAction altText="Fechar Notificação">Fechar</ToastAction>
      ),
    });
  };

  const handleClick = async () => {
    if (!isFavorite) {
      await handleButtonClick();
    } else {
      handleToast("já favoritado");
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {showIcon ? (
        <HiOutlineStar size={20} />
      ) : (
        <FaStar size={20} />
      )}
    </Button>
  );
}
