import { TbBookmarks } from "react-icons/tb";
import { CommandDialogDemo } from "../commandDialog";
import { CiBellOn } from "react-icons/ci";
import { ModeToggle } from "../ui/toggle-mode";
import {
  SidebarContext,
  SidebarNotifyContext,
  TabSelectContext,
} from "@/shared/context/aside";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ToastDemo } from "../toast/toast";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header = () => {
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const { selectedTab } = useContext(TabSelectContext)!;
  console.log(selectedTab);
  return (
    <header className="bg-background p-[28px] w-full flex-shrink-0 flex items-center h-[5.5rem] border-b-2 border-secondary">
      <ul className="flex justify-between w-full">
        <li className="text-sm flex flex-row gap-3 items-center">
          {isOpen ? (
            ""
          ) : (
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
              <RxHamburgerMenu />
            </Button>
          )}
          <TbBookmarks size={20} />
          <ToastDemo />
          {selectedTab == "Administrador" ? (
            <>
              <span className="flex flex-row gap-2 items-center text-muted-foreground text-md">
                {selectedTab}
              </span>
              <span className="text-muted-foreground">/</span>
              <span>Configuração</span>
            </>
          ) : (
            <>
              <span className="flex flex-row gap-2 items-center text-muted-foreground text-md">
                Meu projeto
              </span>
              <span className="text-muted-foreground">/</span>
              <span className=".selector2">{selectedTab}</span>
            </>
          )}
        </li>
        <div className="flex flex-row gap-4 items-center">
          <CommandDialogDemo />
          <ModeToggle />

          {isOpenNotify ? (
            ""
          ) : (
            <Button variant="ghost" onClick={() => setIsOpenNotify(true)}>
              <CiBellOn size={20} />
            </Button>
          )}
        </div>
      </ul>
    </header>
  );
};
