import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { TabSelectContext } from "../app/shared/context/aside";
import Link from "next/link";

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
            className="flex items-center gap-4 text-[14px] cursor-pointer hover:underline"
            onClick={() => handleItemClick(item)}
          >
            <FaCircle size={5} />
            <Link href={`/dashboard/ryanvs/${item}`} passHref>
             {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
