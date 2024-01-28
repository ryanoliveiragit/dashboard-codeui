import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/services/user/get-user-profile";
import { useUserID } from "@/shared/hooks/useProfileID";

type AvatarUserType = {
  size?: string;
  avatarUrl: any;
};

export const AvatarUser = ({ size, avatarUrl }: AvatarUserType) => {
  const userData = useUserID();
  const encurtedFullName = userData.user?.fullName
    .substring(0, 2)
    .toUpperCase();
  return (
    <Avatar className={size}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{encurtedFullName}</AvatarFallback>
    </Avatar>
  );
};
