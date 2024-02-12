import { Button } from "@/src/app/components/ui/button";
import { useToast } from "@/src/app/components/ui/use-toast";
import { useUser } from "@/src/app/shared/context/userData";
import { MdContentCopy } from "react-icons/md";

export const UserID = () => {
  const { toast } = useToast();

  const userData = useUser();
  const handleCopyProfile = () => {
    const valueToCopy = userData?.id;
    if (valueToCopy) {
      navigator.clipboard.writeText(valueToCopy);
      toast({
        variant: "default",
        title: "Copiado para a área de transferência",
        description: "ID: "+ valueToCopy,
      });
    }
  };

  return (
    <section>
      <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">codeUI ID</h1>
          <div>
            <h2 className="text-sm">Este é o seu ID de usuário na codeUI.</h2>
          </div>

          <section className="mt-2 flex items-center gap-2">
            <Button
              variant="outline"
              className="flex flex-row gap-2 text-sm text-muted-foreground"
              onClick={handleCopyProfile}
            >
              {userData?.id}
              <span>
                <MdContentCopy />
              </span>
            </Button>
          </section>
        </section>
      </div>
      <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
        Usado ao interagir com a API codeUI
      </footer>
    </section>
  );
};
