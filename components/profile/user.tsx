import { useState, useEffect } from "react";
import { useUserProfile } from "@/services/user/get-user-profile";
import { AvatarUser } from "./avatar";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { useLoadingContext } from "@/shared/context/loading";

export const UserProfile = () => {
  const { refresh } = useLoadingContext();
  const { data, loading } = useUserProfile();

  return (
    <>
      {loading || refresh ? (
        <Skeleton className="w-full h-[15px]" />
      ) : (
        <section className="flex flex-row gap-4 items-center">
          <AvatarUser avatarUrl="https://github.com/ryanoliveiragit.png" />
          <div className="flex flex-row flex-1 items-center gap-2">
            <div>
              <span className="text-sm">{data?.username}</span>
            </div>

            <Badge className="bg-gradient-to-r from-amber-200 to-yellow-500 font-bold border-none text-[10px] flex items-center justify-center h-3 ">
              PRO
            </Badge>
          </div>
        </section>
      )}
    </>
  );
};
