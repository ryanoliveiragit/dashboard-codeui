import { TabSelectContext } from "@/shared/context/aside";
import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

export const Fodase = () => {
  const { selectedTab } = useContext(TabSelectContext)!;
  const [recentData, setRecentData] = useState<string[]>([]);

  useEffect(() => {
    // Recupera o array existente do localStorage ou cria um novo array vazio
    const storedArray = JSON.parse(localStorage.getItem("recents") || "[]") as string[];

    // Adiciona o novo selectedTab ao array
    const updatedArray = [...storedArray, selectedTab];

    // Converte o array para um conjunto (Set) para remover duplicatas
    const uniqueItemsSet = new Set(updatedArray);

    // Converte o conjunto de volta para um array e mantém apenas os últimos 3 itens
    const uniqueRecentItems = Array.from(uniqueItemsSet).slice(-3);

    // Atualiza o estado recents com os itens recentes
    setRecentData(uniqueRecentItems);

    // Salva o array atualizado no localStorage
    localStorage.setItem("recents", JSON.stringify(uniqueRecentItems));
    
    console.log('LocalStorage', uniqueRecentItems);
  }, [selectedTab]);

  return (
    <ul className="flex flex-col gap-3 px-2">
      {recentData.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-4 text-[14px]"
        >
          <FaCircle size={5} color={item} />{" "}
          {item}
        </li>
      ))}
    </ul>
  );
};
