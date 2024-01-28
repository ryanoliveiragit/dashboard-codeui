import { useUserProfile } from "@/services/user/get-user-profile";
import { AvatarUser } from "./avatar";
import { useUserID } from "@/shared/hooks/useProfileID";

export const UserProfile = () => {
  const userData = useUserID();
  const encurtedFullName = userData.user?.fullName
    ? `${userData.user?.fullName.split(" ")[0]} ${userData.user?.fullName
        .split(" ")[1]
        .charAt(0)}.`
    : "";
  return (
    <section className="flex flex-row gap-2 items-center">
      <AvatarUser avatarUrl="https://github.com/ryanoliveiragit.png" />
      <span>{encurtedFullName}</span>
    </section>
  );
};
