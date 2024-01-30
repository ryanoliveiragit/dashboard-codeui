import { useUserProfile } from "@/services/user/get-user-profile";
import { AvatarUser } from "./avatar";
import { Badge } from "../ui/badge";

export const UserProfile = () => {
  const { data, loading, error } = useUserProfile();
  
  return (
    <section className="flex flex-row gap-4 items-center">
      <AvatarUser avatarUrl="https://github.com/ryanoliveiragit.png" />
      <div className="flex flex-row justify-between flex-1 items-center">
        <span className="text-md">{data?.username}</span>
        <Badge className="bg-gradient-to-r from-amber-200 to-yellow-500 font-bold border-none text-[11px] flex items-center justify-center h-4">
          PRO
        </Badge>
      </div>
    </section>
  );
};
