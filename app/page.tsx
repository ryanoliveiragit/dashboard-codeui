"use client";
import { AnalyticsContent } from "@/components/analytics";
import { AsideNotify } from "@/components/aside-notify";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading/loading";
import { Sidebar } from "@/components/sidebar";
import { TabSelectContext } from "@/shared/context/aside";
import { useGetPathname } from "@/shared/hooks/usePathname";

import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { selectedTab } = useContext(TabSelectContext)!;
  const UsePath = useGetPathname(selectedTab);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Sidebar />
          <main className="flex-1 flex-col">
            <Header />
            <section
              className="p-5 h-screen max-h-[900px] overflow-x-auto"
              style={{ height: "calc(100vh - 5.5rem)" }}
            >
              {UsePath}
            </section>
          </main>
          <AsideNotify />
        </>
      )}
    </>
  );
}
