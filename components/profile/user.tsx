import { useState, useEffect } from "react";
import { useUserProfile } from "@/services/user/get-user-profile";
import { AvatarUser } from "./avatar";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const UserProfile = () => {
  const { data, loading, fetchUserData } = useUserProfile();
  const [previousUsername, setPreviousUsername] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(fetchUserData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data && data.username && previousUsername !== data.username) {
      setPreviousUsername(data.username);
    }
  }, [data?.username]);

  return (
    <section className="flex flex-row gap-4 items-center">
      <AvatarUser avatarUrl="https://github.com/ryanoliveiragit.png" />
      <div className="flex flex-row flex-1 items-center gap-2">
        {loading ? (
          <Skeleton className="w-full h-[15px]" />
        ) : (
          <div>
            <span className="text-sm">{data?.username}</span>
          </div>
        )}
        {loading ? (
          <Skeleton className="w-14 h-[15px]" />
        ) : (
          <Badge className="bg-gradient-to-r from-amber-200 to-yellow-500 font-bold border-none text-[10px] flex items-center justify-center h-3 ">
            PRO
          </Badge>
        )}
      </div>
    </section>
  );
};
