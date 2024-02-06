import { ReactNode } from "react";
import FixedList from "@/src/app/components/listProfile/list-profile";
import { Skeleton } from "@/src/app/components/ui/skeleton";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <section >
      {children}
    </section>
  );
}
