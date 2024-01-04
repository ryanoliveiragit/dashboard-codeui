import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AvatarUser = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/ryanoliveirdagit.png" />
      <AvatarFallback>R.O</AvatarFallback>
    </Avatar>
  );
};
