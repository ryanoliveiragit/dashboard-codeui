"use client";
import { UserProfile } from "../profile";
import { AnimatePresence, motion } from "framer-motion";

import React, {
  useState,
  useContext,
} from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImExit } from "react-icons/im";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "../ui/toggle-mode";

import { myProjectLinks } from "@/lib/sidebar-links";
import { tabData } from "@/lib/history-links";
import { settingsData } from "@/lib/settings-links";
import { SidebarContext, TabSelectContext } from "@/shared/context/aside";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const { selectedTab, setSelectedTab } = useContext(TabSelectContext)!;

  const [buttonStyles, setButtonStyles] = useState<
    Record<string, React.CSSProperties>
  >(
    myProjectLinks.reduce((acc, item) => {
      acc[item.text] = { backgroundColor: "" };
      return acc;
    }, {} as Record<string, React.CSSProperties>)
  );

  const handleClose = () => setIsOpen(false);
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);

    const resetStyles: Record<string, React.CSSProperties> =
      myProjectLinks.reduce((acc, item) => {
        acc[item.text] = { backgroundColor: "" };
        return acc;
      }, {} as Record<string, React.CSSProperties>);
    setButtonStyles(resetStyles);

    setButtonStyles((prevStyles) => ({
      ...prevStyles,
      [tabName]: { backgroundColor: "#FAFAFA", color: 'black' },
    }));
  };

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

                    {Object.entries(tabData).map(([tabName, tabContent]) => (
                      <TabsContent key={tabName} value={tabName}>
                        <ul className="flex flex-col gap-3 px-2">
                          {tabContent.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-4 text-[14px]"
                            >
                              <FaCircle size={5} color={item.color} />{" "}
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                <div className="mt-8">
                  <h3 className="rounded-sm text-sm font-medium text-muted-foreground">
                    Meu projeto
                  </h3>
                  <ul className="mt-2">
                    {myProjectLinks.map((item, index) => (
                      <li key={index}>
                        <Button
                          variant="ghost"
                          className="gap-4 w-full justify-start font-normal"
                          onClick={() => handleTabClick(item.text)}
                          style={buttonStyles[item.text]}
                        >
                          {React.createElement(item.icon, { size: 20 })}
                          {item.text}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="rounded-sm text-sm font-medium text-muted-foreground py-2">
                    Configurações
                  </h3>
                  {settingsData.map((setting, index) => (
                    <li key={index} className="px-2">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`}>
                          <div className="flex gap-4 items-center w-full font-normal">
                            {setting.icon && <setting.icon size={20} />}
                            <AccordionTrigger className="flex gap-4">
                              {setting.title}
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <ul className="flex flex-col gap-5 px-4 py-2">
                              {setting.content.map((item, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="flex items-center text-sm"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  ))}
                </div>
              </ul>
              <section className="flex flex-col gap-4 mt-auto p-[24px] border-r-2  border-secondary ">
                <section className="w-full flex flex-row items-center justify-between">
                  <ModeToggle />
                  <Button variant="outline" onClick={handleClose}>
                    <RxHamburgerMenu />
                  </Button>

                  <Button variant="default">
                    <ImExit />
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
