import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { HiOutlineStar } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

export function ToastDemo() {
  const { toast } = useToast();
  const [showIcon, setShowIcon] = useState(true);

  const handleButtonClick = () => {
    toast({
      title: "Analytics adicionado como favorito!",
      description: "Ryan O. Adicionou Analytics como favorito",
      action: <ToastAction altText="Fechar Notificação">Fechar</ToastAction>,
    });

    // Altera o estado para exibir o texto "A" em vez do ícone
    setShowIcon(false);
  };

  return (
    <Button variant="ghost" onClick={handleButtonClick}>
      {showIcon ? (
        // Renderiza o ícone se showIcon for verdadeiro
        <HiOutlineStar size={20} />
      ) : (
        // Renderiza o texto "A" se showIcon for falso
        <FaStar size={20}/>
      )}
    </Button>
  );
}
