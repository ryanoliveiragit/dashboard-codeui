"use client"
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AvatarUser } from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/services/user/get-user-profile";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useToastError } from "@/shared/hooks/useErrorsInputForm";
const Avatar = dynamic(() => import("react-avatar-edit"), {
  ssr: false,
});
import { useLoadingContext } from "@/shared/context/loading";
import dynamic from "next/dynamic";
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
  const { data } = useUserProfile();
  const { setRefresh } = useLoadingContext();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<any | null>(null);
  const [preview, setPreview] = useState<any | null>(null);
  const token = Cookies.get("auth_token");
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<usernameFormInputs>({
    resolver: zodResolver(usernameSchema),
  });
  const { formErrors } = useToastError({ errors });
  const nameValue = watch("username");
  console.log(formErrors);

  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view: any) => {
    setPreview(view);
    setAvatarUrl(view);

    const blob = dataURItoBlob(view);
    setFile(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleFileSubmit = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);

        const response = await axios.patch(
          "https://codeui-api-development.up.railway.app/api/user/avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Avatar atualizado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar o avatar:", error);
      }
    }
  };

  const simulateLoading = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000); // 2 segundos
  };

  const handleUpdateProfile = (data: usernameFormInputs) => {
    handleFileSubmit();

    axios
      .put("https://codeui-api-development.up.railway.app/api/user", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        simulateLoading();
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

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
                placeholder={data?.username}
                {...register("username")}
              />
            </section>
          </section>
          <section>
            {
              <div className="text-primary">
                <div className="flex items-center justify-center flex-col  mr-14">
                  {data?.avatar ? (
                    <>
                      <AvatarUser
                        size="w-[100px] h-[100px]"
                        avatarUrl={data?.avatar}
                      />
                      <div className="absolute rounded-md">
                        <Avatar
                        
                          label={"."}
                          labelStyle={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "2",
                          }}
                          width={100}
                          height={100}
                          onCrop={onCrop}
                          onClose={onClose}
                          src={src}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            }
          </section>
        </div>
        <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
          Use no máximo 12 caracteres.
          <Button
            className="h-8"
            variant="default"
            type="submit"
            disabled={!nameValue && avatarUrl == null}
          >
            Salvar
          </Button>
        </footer>
      </section>
    </form>
  );
};
