import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { TabSelectContext } from "../app/shared/context/aside";
import Link from "next/link";
import { BiCollapseAlt } from "react-icons/bi";
export const RecentItens = () => {
  const { setSelectedTab, selectedTab } = useContext(TabSelectContext)!;

  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    const storedArray = JSON.parse(
      localStorage.getItem("recents") || "[]"
    ) as string[];
    const updatedArray = [...storedArray, selectedTab];
    const uniqueItemsSet = new Set(updatedArray);
    let uniqueRecentItems = Array.from(uniqueItemsSet).slice(-2);
    uniqueRecentItems = uniqueRecentItems.reverse();
    setRecents(uniqueRecentItems);
    localStorage.setItem("recents", JSON.stringify(uniqueRecentItems));
  }, [selectedTab]);

  const handleItemClick = (item: string) => {
    setSelectedTab(item);
  };

  return (
    <div>
      <ul className="flex flex-col gap-3 px-2">
        {recents.map((item, index) => (
          
          <li
            key={index}
            className="flex flex-row gap-3 items-center text-sm text-muted-foreground fill-gray-300"
            onClick={() => handleItemClick(item)}
          >
            <BiCollapseAlt size={10} />
            <Link href={`/dashboard/ryanvs/${item}`} passHref>
             {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
