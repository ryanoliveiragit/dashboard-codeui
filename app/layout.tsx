import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { AsideNotify } from "@/components/aside-notify";
import {
  SidebarNotifyProvider,
  SidebarProvider,
  TabSelectProvider,
} from "@/shared/context/aside";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body>
        <SidebarNotifyProvider>
          <SidebarProvider>
            <TabSelectProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="w-full flex">
                  <Sidebar />
                  {children}
                  <AsideNotify />
                </div>
              </ThemeProvider>
            </TabSelectProvider>
          </SidebarProvider>
        </SidebarNotifyProvider>
      </body>
    </html>
  );
}
