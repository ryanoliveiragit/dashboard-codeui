"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BiBell } from "react-icons/bi";

import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarNotifyContext } from "@/shared/context/aside";
import { AvatarUser } from "../profile/avatar";

export const AsideNotify = () => {
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;

  const handleClose = () => setIsOpenNotify(false);

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
            <aside className="flex flex-col h-full">
              <ul className="p-[24px] bg-background border-l-2 border-secondary flex-grow">
                <h1 className="text-sm flex flex-row gap-2 items-center mt-2">
                  <BiBell /> Notificações
                </h1>

                {/*teste*/}
                <section className="flex flex-col gap-4 mt-5">
                  <div className="mt-5 flex gap-2 items-center">
                    <AvatarUser />

                    <div className="flex flex-col ">
                      <div className="flex flex-row gap-2">
                        <h3 className="text-sm text-primay">Corrigiu um</h3>
                        <span className="font-bold text-primary text-sm -ml-[3px]">
                          bug
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        agora
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-2 items-center">
                    <AvatarUser />

                    <div className="flex flex-col ">
                      <div className="flex flex-row gap-2">
                        <h3 className="text-sm text-primay">Baixou</h3>
                        <span className="font-bold text-primary text-sm -ml-[3px]">
                          [Storybook.pdf]
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        há 2 horas
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-2 items-center">
                    <AvatarUser />

                    <div className="flex flex-col ">
                      <div className="flex flex-row gap-2">
                        <h3 className="text-sm text-primay">Cadastrou</h3>
                        <span className="font-bold text-primary text-sm -ml-[3px]">
                          Novo usuário
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ha 4 horas
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
            </aside>
          )}
        </motion.aside>
      </AnimatePresence>
    </div>
  );
};
