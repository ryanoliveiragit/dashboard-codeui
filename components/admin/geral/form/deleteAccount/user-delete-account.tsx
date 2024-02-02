import { useUserProfile } from "@/services/user/get-user-profile";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { MdContentCopy } from "react-icons/md";

export const DeleteAccount = () => {
  const { toast } = useToast();
  const { data } = useUserProfile();

  const handleUpdateProfile = () => {
    toast({
      variant: "default",
      title: "Copiado para area de transferencia",
      description: "codeID",
    });
  };

  return (
    <section>
      <div className="border w-full p-5 rounded-t-md flex flex-row justify-between border-red-800">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Deletar conta</h1>
          <div>
            <h2 className="text-sm">Remover permanentemente sua Conta e todo o seu conteúdo da plataforma codeUI. Esta ação não é reversível, portanto continue com cautela.</h2>
          </div>

          <section className="mt-2 flex items-center gap-2">
   
          </section>
        </section>
      </div>
      <footer className="border w-full px-5 py-4 rounded-b-md text-sm text-muted-foreground flex flex-row justify-end items-center border-red-800 bg-red-800/20">
        <Button className="h-8 cursor-not-allowed" variant="destructive" type="submit"   >
          Excluir sua conta
        </Button>
      </footer>
    </section>
  );
};
