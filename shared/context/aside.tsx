'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

//right
type SidebarNotifyContextType = {
  isOpenNotify: boolean;
  setIsOpenNotify: Dispatch<SetStateAction<boolean>>;
};

export const SidebarNotifyContext = createContext<SidebarNotifyContextType | undefined>(undefined);

interface SidebarNotifyContextProps {
  children: ReactNode;
}

export function SidebarNotifyProvider({ children }: SidebarNotifyContextProps) {
  const [isOpenNotify, setIsOpenNotify] = useState(true);

  return (
    <SidebarNotifyContext.Provider value={{ isOpenNotify, setIsOpenNotify }}>
      {children}
    </SidebarNotifyContext.Provider>
  );
}

//left
type SidebarContextType = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  };
  
  export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
  
  interface SidebarContextProps {
    children: ReactNode;
  }
  
  export function SidebarProvider({ children }: SidebarContextProps) {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </SidebarContext.Provider>
    );
  }
  
  //tabSelect
  type TabSelectContextType = {
    selectedTab: string;
    setSelectedTab: Dispatch<SetStateAction<string>>;
  };
  
  export const TabSelectContext = createContext<TabSelectContextType | undefined>(undefined);
  
  interface TabSelectContextProps {
    children: ReactNode;
  }
  
  export function TabSelectProvider({ children }: TabSelectContextProps) {
    const [selectedTab, setSelectedTab] = useState('dashboard');
  
    return (
      <TabSelectContext.Provider value={{ selectedTab, setSelectedTab }}>
        {children}
      </TabSelectContext.Provider>
    );
  }