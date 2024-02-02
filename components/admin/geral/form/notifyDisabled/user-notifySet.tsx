import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserProfile } from "@/services/user/get-user-profile";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useToastError } from "@/shared/hooks/useErrorsInputForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const notifySchema = z.object({
  notify: z.any().optional(),
});
type notifyFormInputs = z.infer<typeof notifySchema>;

export const UserNotifySet = () => {
  const { toast } = useToast();
  const [notifyPopup, setNotifyPopup] = useState(true);
  function handleUpdateNotify() {
    setNotifyPopup(!notifyPopup);
  }
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<notifyFormInputs>({
    resolver: zodResolver(notifySchema),
  });

  const { formErrors } = useToastError({ errors });
  console.log(formErrors);

  const handleUpdateProfile = () => {
    console.log(notifyPopup);
    toast({
      variant: "default",
      title: "Perfil atualizado com sucesso",
      description: "Notificações",
    });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <section>
        <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
          <section className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">
              Notificações
            </h1>
            <div>
              <h2 className="text-sm">
                Ative esta opção para receber notificações por e-mail.
              </h2>
            </div>

            <section className="mt-2 flex items-center gap-2">
              <Switch id="email-notifications" {...register("notify")} onClick={handleUpdateNotify} defaultChecked disabled/>
              <Label htmlFor="email-notifications gap-2">
                Receber notificações.
              </Label>
            </section>
          </section>
        </div>
        <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
        Este valor ainda não pode ser alterado manualmente.
          <Button
            className="h-8"
            variant="default"
            type="submit"
            disabled={notifyPopup}
          >
            Salvar
          </Button>
        </footer>
      </section>
    </form>
  );
};
