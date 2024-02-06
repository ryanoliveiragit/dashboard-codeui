"use client";
import { UserProfile } from "../profile";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import NextLink from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { ModeToggle } from "../ui/toggle-mode";
import { tabData } from "@/src/utils/history-links";
import { AiOutlineCreditCard } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiChartPieSliceFill } from "react-icons/pi";
import { RecentItens } from "@/src/utils/recentItens";
import ButtonLogout from "../buttonLogOut/ButtonLogout";
import { SidebarContext } from "../../shared/context/aside";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GoGear } from "react-icons/go";
export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const pathname = usePathname();
  console.log("path", pathname);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex ">
      <AnimatePresence>
        <motion.aside
          key="sidebar"
          initial={{ width: 0 }}
          animate={{ width: isOpen ? 240 : 0 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          {isOpen && (
            <aside className="flex flex-col h-full">
              <ul className="p-[24px] bg-background border-r-2  border-secondary flex-grow">
                <div>
                  <UserProfile />
                </div>

                <div className="flex mt-4">
                  <Tabs defaultValue="Favoritos">
                    <TabsList>
                      {Object.keys(tabData).map((tabName) => (
                        <TabsTrigger
                          key={tabName}
                          value={tabName}
                          className="px-3"
                        >
                          {tabName}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent key={"recents"} value={"Recentes"}>
                      <ul className="flex flex-col gap-3 px-2">
                        <RecentItens />
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-8">
                  <h3 className="rounded-sm text-sm font-medium text-muted-foreground">
                    <Link  href={"ryanvs.dev"} target="_blank" className="hover:underline">1 - www.ryanvs.dev</Link>
                  </h3>

                  <ul className="flex mt-4 flex-col gap-4">
                    <li>
                      <NextLink
                        href="/dashboard/ryanvs/analytics"
                        className={`${
                          pathname?.includes("/dashboard/ryanvs/analytics")
                            ? "bg-primary rounded-md text-secondary h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted"
                        } flex gap-2 items-center`}
                        passHref
                      >
                        <PiChartPieSliceFill size={18} /> Analytics
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href="/dashboard/ryanvs/document"
                        className={`${
                          pathname?.includes("/dashboard/ryanvs/document")
                            ? "bg-primary rounded-md text-secondary h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted"
                        } flex gap-2 items-center`}
                        passHref
                      >
                        <IoDocumentTextOutline size={18} /> Documentação
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href="/dashboard/ryanvs/investiment"
                        className={`${
                          pathname?.includes("/dashboard/ryanvs/investiment")
                            ? "bg-primary rounded-md text-secondary h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted"
                        } flex gap-2 items-center`}
                        passHref
                      >
                        <AiOutlineCreditCard size={18} /> Investimento
                      </NextLink>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="rounded-sm text-sm font-medium text-muted-foreground py-2">
                    Configurações
                  </h3>
                  <ul>
                  <NextLink
                        href="/dashboard/settings/profile"
                        className={`${
                          pathname?.includes("/dashboard/settings/profile")
                            ? "bg-primary rounded-md text-secondary h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted"
                        } flex gap-2 items-center`}
                        passHref
                      >
                        <GoGear size={18} /> Configurações
                      </NextLink>
                  </ul>
                </div>
              </ul>
              <section className="flex flex-col gap-4 mt-auto p-[24px] border-r-2  border-secondary ">
                <section className="w-full flex flex-row items-center justify-between">
                  <ModeToggle />
                  <Button variant="outline" onClick={handleClose}>
                    <RxHamburgerMenu />
                  </Button>
                  <ButtonLogout />
                </section>
              </section>
            </aside>
          )}
        </motion.aside>
      </AnimatePresence>
    </div>
  );
};