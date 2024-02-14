"use client"
import { useState } from "react";
import { useLoading } from "../../shared/context/loading";
import { Skeleton } from "../ui/skeleton";
import GeralConfig from "./geral/geral";

import { adminData } from "@/src/utils/admin-links";
import { Plans } from "../plans/plans";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

interface AdminItem {
  title: string;
}

export const Admin = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Geral"); // Estado para armazenar o item selecionado
  const { loading, setLoadingWithTimeout } = useLoading();
  const { data: session } = useSession();
  const handleClick = () => {
    signIn("google");
  };
  // Função para renderizar o componente selecionado
  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "Geral":
        return <GeralConfig />;
      case "Planos":
        return <Plans />;
      // Adicione casos para outros itens da lista conforme necessário
      default:
        return null; // Caso nenhum item seja selecionado ou o componente não exista
    }
  };

  return (
    <section className="flex flex-row relative">
      {loading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <>
          <ul className="flex flex-col gap-2 w-1/6 fixed pr-5">
            {adminData.config.map((item: AdminItem, index: number) => (
              <li
                key={index}
                className={`text-sm p-2 rounded-md cursor-pointer hover:bg-accent hover:text-primary ${
                  selectedItem === item.title
                    ? "text-primary bg-muted font-semibold"
                    : "text-muted-foreground"
                }`}
                onClick={() => setSelectedItem(item.title)} // Atualiza o estado selectedItem ao clicar no item
              >
                {item.title === "Planos" ? (
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {/* Adicione a badge NEW apenas se for um item específico */}
                    <Badge
                      variant="default"
                      className="mr-2 h-4 text-[10px] font-bold bg-third text-primary dark:text-secondary"
                    >
                      NEW
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <span>{item.title}</span>
                 
                  </div>
                )}
              </li>
            ))}
              <button
                type="button"
                className="btn btn-link btn-floating-mx-1"
                onClick={() => signIn("google")}
              >
                a
              </button>
                
          </ul>

          <aside className="h-full ml-80 w-full">
            {renderSelectedComponent()} {/* Renderize o componente selecionado */}
          </aside>
        </>
      )}
    </section>
  );
};
