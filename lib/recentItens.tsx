import { TabSelectContext } from "@/shared/context/aside";
import { useGetPathname } from "@/shared/hooks/usePathname";

import { useContext, useEffect, useState, useMemo } from "react";
import { FaCircle } from "react-icons/fa";

export const RecentItens = () => {
  const { setSelectedTab, selectedTab } = useContext(TabSelectContext)!;

  const [recents, setRecents] = useState<string[]>([]);

  useGetPathname(selectedTab);
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
    console.log("LocalStorage", uniqueRecentItems);
  }, [selectedTab, setRecents, setSelectedTab]);

  const handleItemClick = (item: string) => {
    setSelectedTab(item);
    console.log(item);
  };

  const recentData = useMemo(() => recents, [recents]);

  return (
    <div>
      <ul className="flex flex-col gap-3 px-2">
        {recentData.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 text-[14px] cursor-pointer hover:underline"
            onClick={() => handleItemClick(item)}
          >
            <FaCircle size={5} /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
