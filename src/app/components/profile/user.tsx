import { AvatarUser } from "./avatar";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "../../shared/context/userData"; // Importe o hook useUser corretamente
import { DropdownMenuDemo } from "./dropdown-menu/dropdown";
import { BadgeBackgroundShine } from "../ui/badge-background-shine";

export const UserProfile = () => {
  const userData = useUser(); // Use o hook useUser diretamente
  const loading = !userData; // Verifique se os dados do usuário estão carregando

  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-[15px]" />
      ) : (
        <section className="flex flex-row gap-4 items-center">
          <AvatarUser
            avatarUrl={
              userData.avatar === null
                ? "https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/scrolling-gradient.png?fit=1200%2C600&ssl=1"
                : userData.avatar
            }
          />
          <div className="flex flex-row items-center justify-center gap-4">
            <div>
              <span className="text-base font-semibold text-primary">
                {userData.username}
              </span>{" "}
            </div>
            <BadgeBackgroundShine>{userData.plan}</BadgeBackgroundShine>
            <section>
              
              <DropdownMenuDemo />
            </section>
          </div>
        </section>
      )}
    </>
  );
};
