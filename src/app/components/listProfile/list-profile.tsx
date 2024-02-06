// components/FixedList.js
"use client"
import { GoGear } from "react-icons/go";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function FixedList() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-2  w-96  bg-black pr-5">
      <li>Geral</li>
      <NextLink
        href="/dashboard/settings/profile/geral"
        className={`${
          pathname?.includes("/dashboard/settings/profile/geral")
            ? "bg-primary rounded-md text-secondary h-10 p-2 w-full font-semibold text-sm"
            : "bg-background rounded-md text-primary h-10 p-2 w-full font-normal hover:bg-muted"
        } flex gap-2 items-center`}
        passHref
      >
        <GoGear size={18} /> Configurações
      </NextLink>
    </ul>
  );
}
