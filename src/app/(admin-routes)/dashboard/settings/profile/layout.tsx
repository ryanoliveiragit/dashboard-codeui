import { ReactNode } from "react";
import FixedList from "@/src/app/components/listProfile/list-profile";
import { Skeleton } from "@/src/app/components/ui/skeleton";
import { Admin } from "@/src/app/components/admin";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Admin />
  );
}
