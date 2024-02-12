import { getServerSession } from "next-auth";
import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/ryanvs/analytics");
  }

  return <>{children}</>;
}
