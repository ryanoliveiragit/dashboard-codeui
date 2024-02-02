import { ProviderUserConfig } from "@/components/provider-user-config";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserProfile } from "@/services/user/get-user-profile";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useToastError } from "@/shared/hooks/useErrorsInputForm";
import InputMask from "react-input-mask";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  contact: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: "O telefone deve estar no formato (99) 99999-9999",
    })
    .optional(),
});
type contactFormInputs = z.infer<typeof contactSchema>;

export const UserContactConfig = () => {
  const { toast } = useToast();
  const { data } = useUserProfile();
  const token = Cookies.get("auth_token");
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<contactFormInputs>({
    resolver: zodResolver(contactSchema),
  });
  const { formErrors } = useToastError({ errors });
  console.log(formErrors);
  const contactValue = watch("contact");
  const handleUpdateProfile = (data: contactFormInputs) => {
    axios
      .put("https://codeui-api-production.up.railway.app/api/user", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        toast({
          variant: "default",
          title: "Perfil atualizado com sucesso",
          description: "Username",
        });
      })
      .catch((error) => {
        console.error("Erro ao atualizar perfil:", error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar perfil",
          description: "Ocorreu um erro ao atualizar o perfil.",
        });
      });
  };

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) return "";
    const cleaned = phoneNumber.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    return formatted;
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <section>
        <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
          <section className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Seu número de telefone</h1>
            <div>
              <h2 className="text-sm">Insira um número de telefone para receber atualizações importantes.</h2>
            </div>
            <section className="mt-2">
              <InputMask
                mask="(99) 99999-9999"
                maskPlaceholder="_"
                className={`w-72 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.contact
                    ? "border-red-500 focus:outline-red-500 outline-red-500 focus-visible:ring-red-500 focus-visible:ring-2-red-500 focus-visible:ring-offset-red-500"
                    : ""
                }`}
                placeholder={formatPhoneNumber(data?.contact)}
                {...register("contact")}
              />
            </section>
          </section>
        </div>
        <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
          Um código será enviado para verificar
          <Button
            className="h-8"
            variant="default"
            type="submit"
            disabled={!contactValue}
          >
            Salvar
          </Button>
        </footer>
      </section>
    </form>
  );
};
