import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/services/user/get-user-profile";


type AvatarUserType = {
  size?: string;
  avatarUrl: any;
};

export const AvatarUser = ({ size, avatarUrl }: AvatarUserType) => {
  const { data, loading, error } = useUserProfile();
  return (
    <Avatar className={size}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{data?.username}</AvatarFallback>
    </Avatar>
  );
};
