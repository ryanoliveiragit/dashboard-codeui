import { HiOutlineStar } from "react-icons/hi2";
import { TbBookmarks } from "react-icons/tb";
import { CommandDialogDemo } from "../commandDialog";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBackSharp } from "react-icons/io5";
import { ModeToggle } from "../ui/toggle-mode";
import { SidebarContext, SidebarNotifyContext, TabSelectContext } from "@/shared/context/aside";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ToastDemo } from "../toast/toast";

export const Header = () => {
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const { selectedTab } = useContext(TabSelectContext)!;
  console.log(selectedTab)
  return (
    <header className="bg-primary-foreground p-[28px] w-full flex-shrink-0 flex items-center h-[5.5rem] border-b-2 border-secondary">
      <ul className="flex justify-between w-full">
        
        <li className="text-sm flex flex-row gap-3 items-center">
        {isOpen ? (
            ""
          ) : (
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
              <IoArrowBackSharp />
            </Button>
          )}
          <TbBookmarks size={20} />
          <ToastDemo />
          <span className="flex flex-row gap-2 items-center text-muted-foreground">
            Meu projeto
          </span>
          <span className="text-muted-foreground">/</span>
          <span>{selectedTab}</span>
        </li>
        <div className="flex flex-row gap-4 items-center">
          <CommandDialogDemo />
          <ModeToggle />

          {isOpenNotify ? (
            ""
          ) : (
            <Button variant="ghost" onClick={() => setIsOpenNotify(true)}>
              <IoArrowForwardOutline />
            </Button>
          )}
          
        </div>
      </ul>
    </header>
  );
};
