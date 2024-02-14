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
import { useUser } from "../../shared/context/userData";
import { FaCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoUnlink } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const pathname = usePathname();
  console.log("path", pathname);
  const handleClose = () => setIsOpen(false);
  const UserData = useUser();
  const { data: session } = useSession();

  const handleDeleteFavorite = async () => {
    try {
      const response = await axios.delete(
        `https://codeui-api-development.up.railway.app/api/user/favorite/2`, // Incluindo o ID na URL
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      alert("erro");
    }
  };

  return (
    <div className="flex ">
      <AnimatePresence>
        <motion.aside
          key="sidebar"
          initial={{ width: 0 }}
          animate={{ width: isOpen ? 285 : 0 }}
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

                <div className="mt-4">
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

                    <TabsContent key={"favorites"} value={"Favoritos"}>
                      <ul className="flex flex-col px-2 text-sm gap-3 w-full">
                        {UserData?.favorites.map((favorite) => (
                          <li
                            key={favorite.id}
                            className="flex flex-row items-center gap-3 px-2 justify-between w-full"
                          >
                            <span className="flex flex-row gap-3 hover:underline cursor-pointer items-center text-sm text-muted-foreground fill-gray-300">
                              <IoUnlink size={12} color="#D0F393" />
                              {favorite.name}
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    onClick={handleDeleteFavorite}
                                    variant="ghost"
                                    className="p-3 h-0 text-gray-500 hover:text-red-500"
                                  >
                                    <FaRegTrashAlt size={12} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Excluir favorito</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-8">
                  <h3 className="rounded-sm text-sm font-medium text-muted-foreground">
                    <Link
                      href={"ryanvs.dev"}
                      target="_blank"
                      className="hover:underline"
                    >
                      1 - www.ryanvs.dev
                    </Link>
                  </h3>

                  <ul className="flex mt-4 flex-col gap-4">
                    <li>
                      <NextLink
                        href="/dashboard/ryanvs/analytics"
                        className={`${
                          pathname?.includes("/dashboard/ryanvs/analytics")
                            ? "border border-third text-primary rounded-md h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted text-sm"
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
                            ? "border border-third text-primary rounded-md h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted text-sm"
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
                            ? "border border-third text-primary rounded-md h-10 p-2 w-full font-semibold text-sm"
                            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted text-sm"
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
                          ? "border border-third text-primary rounded-md h-10 p-2 w-full font-semibold text-sm"
                          : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted text-sm"
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
