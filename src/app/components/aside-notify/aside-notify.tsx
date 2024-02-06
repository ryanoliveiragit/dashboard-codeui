"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BiBell } from "react-icons/bi";
import React, {
  useState,
  useContext,
} from "react";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";

import { AvatarUser } from "../profile/avatar";
import { Badge } from "../ui/badge";
import { SidebarNotifyContext, TabSelectContext } from "../../shared/context/aside";

export const AsideNotify = () => {
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { setSelectedTab } = useContext(TabSelectContext)!;
  const [newItem, setNewItem] = useState<string[]>(["Planos"]);
  const handleClose = () => setIsOpenNotify(false);

  const handleItemClick = (clickedItem: string) => {
    setSelectedTab(clickedItem);
    console.log(clickedItem);
  };

  return (
    <div className="flex">
      <AnimatePresence>
        <motion.aside
          key="sidebar"
          initial={{ width: 0 }}
          animate={{ width: isOpenNotify ? 290 : 0 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          {isOpenNotify && (
            <div className="flex flex-col h-full">
              <ul className="p-[24px] bg-background border-l-2 border-secondary flex-grow">
                <h1 className="text-sm flex flex-row gap-2 items-center mt-2">
                  <BiBell /> Notificações
                </h1>

                {/*tested*/}
                <section className="flex flex-col gap-4 mt-5">
                  <div className="mt-5 flex gap-2 items-center">
                    <AvatarUser avatarUrl="" />

                    <div className="flex flex-col ">
                      <div className="flex flex-row gap-2 justify-center items-center flex-1">
                        <h3 className="text-sm text-primay">Adicionou</h3>
                        <span className="font-bold text-primary text-sm -ml-[3px]">
                          {newItem &&
                            newItem.map((item: any, index: any) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="h-5 items-center flex justify-center text-[11px] cursor-pointer"
                                onClick={() => handleItemClick(item)}
                              >
                                {item}
                              </Badge>
                            ))}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        agora
                      </span>
                    </div>
                  </div>
                </section>
              </ul>
              <section className="flex flex-col gap-4 mt-auto p-[24px] border-l-2  border-secondary ">
                <section className="flex flex-row items-center justify-between">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClose}
                  >
                    <RxHamburgerMenu />
                  </Button>
                </section>
              </section>
            </div>
          )}
        </motion.aside>
      </AnimatePresence>
    </div>
  );
};
