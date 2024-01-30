"use client";
import { adminData } from "@/lib/admin-links";
import { useState } from "react";
import { useGetPathnameAdminConfig } from "@/shared/hooks/usePathname";
import { Badge } from "../ui/badge";
interface AdminItem {
  title: string;
}

export const Admin: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Geral");

  const UsePath = useGetPathnameAdminConfig(selectedItem);
  const handleItemClick = (index: number) => {
    setSelectedItem(adminData.config[index].title);
  };
  const [newTab, setNewTab] = useState("Planos");
  return (
    <section className="flex flex-row relative">
      <ul className="flex flex-col gap-2 w-1/6 fixed pr-5">
        {adminData.config.map((item: AdminItem, index: number) => (
          <li
            key={index}
            className={`text-sm p-2 rounded-md cursor-pointer hover:bg-accent hover:text-primary ${
              selectedItem === item.title
                ? "text-primary bg-muted font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item.title === "Planos" ? (
              <div className="flex items-center gap-2">
                  <span>{newTab}</span>
                <Badge variant="default" className="mr-2 h-4 text-[10px] font-bold">
                NEW
                </Badge>
              
              </div>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>

      <aside className="h-full ml-80 w-full">{UsePath}</aside>
    </section>
  );
};
