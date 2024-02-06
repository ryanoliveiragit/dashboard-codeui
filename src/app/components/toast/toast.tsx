"use client";
import React, { useState } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export function ToastDemo() {
  const { toast } = useToast();
  const [showIcon, setShowIcon] = useState(true);
  const pathname = usePathname();
  const [toastDescription, setToastDescription] = useState<string>("");

  const handleButtonClick = () => {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    setToastDescription(lastPart);

    setShowIcon(false);
    toast({
      title: `Usuario adicionou ${lastPart} como favorito`,
      action: <ToastAction altText="Fechar Notificação">Fechar</ToastAction>,
    });
  };

  return (
    <Button variant="ghost" onClick={handleButtonClick}>
      {showIcon ? (
        // Renderiza o ícone se showIcon for verdadeiro
        <HiOutlineStar size={20} />
      ) : (
        // Renderiza o texto "A" se showIcon for falso
        <FaStar size={20} />
      )}
    </Button>
  );
}
