"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ImExit } from "react-icons/im";

export default function ButtonLogout() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <>
      <Button variant="default" onClick={logout}>
        <ImExit />
      </Button>
    </>
  );
}
