"use client";
import { AnalyticsContent } from "@/components/analytics";
import { Header } from "@/components/header";
import { TabSelectContext } from "@/shared/context/aside";
import { useGetPathname } from "@/shared/hooks/usePathname";
import { useContext, useState } from "react";

export default function Home() {
  const { selectedTab } = useContext(TabSelectContext)!;

  return (
    <main className="flex-1 flex-col">
      <Header />
      <section className="p-5 h-screen max-h-[900px] overflow-x-auto" style={{ height: "calc(100vh - 5.5rem)" }}>
        {useGetPathname(selectedTab)}
      </section>
    </main>
  );
}
