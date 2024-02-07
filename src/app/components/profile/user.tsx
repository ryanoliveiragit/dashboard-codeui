import { AvatarUser } from "./avatar";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "../../shared/context/userData"; // Importe o hook useUser corretamente
import { DropdownMenuDemo } from "./dropdown-menu/dropdown";

export const UserProfile = () => {
  const userData = useUser(); // Use o hook useUser diretamente
  const loading = !userData; // Verifique se os dados do usuário estão carregando

  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-[15px]" />
      ) : (
        <section className="flex flex-row gap-4 items-center">
          <AvatarUser avatarUrl={userData.avatar === null ? "https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/scrolling-gradient.png?fit=1200%2C600&ssl=1" : userData.avatar} />
          <div className="flex flex-row flex-1 items-center gap-2">
            <div>
              <span className="text-sm font-semibold text-zinc-200">{userData.username}</span>{" "}
            </div>
            <Badge
              className={`mt-1.5${
                userData.plan === "FREE"
                  ? " mr-2 text-primary dark:text-primary bg-muted text-[10px] flex items-center justify-center h-4 font-bold"
                  : "bg-gradient-to-r from-amber-200 to-yellow-500  border-none text-[10px] flex items-center justify-center h-3 font-bold"
              }`}
            >
              {userData.plan}
            </Badge>
            <DropdownMenuDemo />
          </div>
        </section>
      )}
    </>
  );
};

