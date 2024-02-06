import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { AsideNotify } from "../components/aside-notify";
import { UserProvider } from "../shared/context/userData";
import { LoadingProvider } from "../shared/context/loading";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <UserProvider>
        <LoadingProvider>
          <Sidebar />
          <main className="flex-1 flex-col">
            <Header />
            <section
              className="p-5 h-screen max-h-[900px] overflow-x-auto"
              style={{ height: "calc(100vh - 5.5rem)" }}
            >
              {children}
            </section>
          </main>
          <AsideNotify />
        </LoadingProvider>
      </UserProvider>
    </>
  );
}
