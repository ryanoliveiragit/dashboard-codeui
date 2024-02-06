"use client";

import * as z from "zod";
import "react-image-crop/dist/ReactCrop.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/src/app/components/ui/use-toast";
import { Input } from "@/src/app/components/ui/input";
import { Button } from "@/src/app/components/ui/button";
import { useUser } from "@/src/app/shared/context/userData";
import { instance } from "@/src/utils/axios";

import { useSession } from "next-auth/react";
import Profile from "./profile";

const usernameSchema = z.object({
  username: z
    .string()
    .max(12, {
      message: "O nome de usuário deve ter no máximo 12 caracteres",
    })
    .optional(),
});
type usernameFormInputs = z.infer<typeof usernameSchema>;

export const UserConfigurations = () => {
  const { toast } = useToast();
  const userData = useUser();
  
  const { data: session } = useSession();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch
  } = useForm<usernameFormInputs>({
    resolver: zodResolver(usernameSchema),
  });
  const usernameValue = watch("username");

  async function onSubmit(data: any) {
    try {
      const response = await instance.put("/user", data, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Inclua o token no cabeçalho da requisição
        },
      });
      location.reload();
      toast({
        variant: "default",
        title: "Perfil atualizado com sucesso!",
        description: "Username",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Perfil atualizado com sucesso!",
        description: "Username",
      });
    }
  }

  return (
   <>
  
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        
        <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
          <section className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Nome de exibição</h1>
            <div>
              <h2 className="text-sm">
                Digite seu nome completo ou um nome de exibição com o qual você
                se sinta confortável
              </h2>
            </div>
            <section className="mt-2">
              <Input
                className={`w-72 outline-none ${
                  errors.username
                    ? "border-red-500 focus:outline-red-500 outline-red-500"
                    : ""
                }`}
                placeholder={userData?.username}
                {...register("username")}
              />
            </section>
          </section>
          <Profile />
        </div>
        <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
          Use no máximo 12 caracteres.
          <Button
            className="h-8"
            variant="default"
            type="submit"
            disabled={!usernameValue}
          >
            Salvar
          </Button>
        </footer>
      </section>
    </form></>
  );
};
