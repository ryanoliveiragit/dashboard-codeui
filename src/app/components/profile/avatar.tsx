import { MouseEventHandler, useState } from "react";
import { useUser } from "../../shared/context/userData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "./dropdown-menu/dropdown";

type AvatarUserType = {
  size?: string;
  avatarUrl: any;
};

export const AvatarUser = ({ size, avatarUrl }: AvatarUserType) => {
  const userData = useUser();

  return (
    <>
      <Avatar className={size}>
        <AvatarImage
          src={
            userData?.avatar === null
              ? "https://cdn.discordapp.com/attachments/1139000785255006258/1207394772944289832/image.png?ex=65df7d02&is=65cd0802&hm=16bb835878a098b6e8d57f608fed96f4aec72d237d5ab525f91a68d513135f6a&"
              : userData?.avatar
          }
        />
        <AvatarFallback>{userData?.username}</AvatarFallback>
      </Avatar>
    </>
  );
};
