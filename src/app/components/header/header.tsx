"use client"
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ToastDemo } from "../toast/toast";
import { TbBookmarks } from "react-icons/tb";
import { SidebarContext, SidebarNotifyContext } from "../../shared/context/aside";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";

export const Header: React.FC = () => {
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;

  const [notify, setNotify] = useState<number>(1);

  const pathname = usePathname();

  const formatPath = () => {
    const parts = pathname.split("/").filter(Boolean); // Remove elementos vazios
    const formattedParts = parts.map((part, index) => {
      if (index === 0) {
        return "Dashboard";
      } else if (index === 1) {
        return "projeto - www.ryanvs";
      } else {
        return part;
      }
    });
    return formattedParts;
  };

  function handleClickNotify() {
    setIsOpenNotify(true);
    setNotify(0);
  }

  return (
    <header className="bg-background p-[28px] w-full flex-shrink-0 flex items-center h-[5.5rem] border-b-2 border-secondary">
      <ul className="flex justify-between w-full">
        <li className="text-md flex flex-row gap-3 items-center">
          {!isOpen && (
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
              <RxHamburgerMenu />
            </Button>
          )}
          <TbBookmarks size={20} />
          <ToastDemo />
          <span className="flex flex-row gap-2 items-center text-muted-foreground ">
            {formatPath().map((part, index) => (
              <span key={index}>
                {part}
                {index < formatPath().length - 1 && <span className="text-primary"> / </span>}
              </span>
            ))}
          </span>
        </li>
        <div className="flex flex-row gap-4 items-center">
          <Button
            variant="ghost"
            onClick={handleClickNotify}
            className="relative"
          >
            <CiBellOn size={25} />
            {notify !== 0 && (
              <span className="bg-red-500 text-white rounded-full absolute top-[5px] flex items-center justify-center right-[10px] w-4 h-4 text-[10px]">
                {notify}
              </span>
            )}
          </Button>
        </div>
      </ul>
    </header>
  );
};
