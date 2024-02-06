import { useUser } from "../../shared/context/userData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AvatarUserType = {
  size?: string;
  avatarUrl: any;
};

export const AvatarUser = ({ size, avatarUrl }: AvatarUserType) => {
  const userData = useUser();

  return (
    <Avatar className={size}>
      <AvatarImage  src={userData?.avatar === null ? "https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/scrolling-gradient.png?fit=1200%2C600&ssl=1" : userData?.avatar} />
      <AvatarFallback>{userData?.username}</AvatarFallback>
    </Avatar>
  )
}
