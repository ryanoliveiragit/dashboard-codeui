import { useState, useEffect, useContext } from "react";
import { useUserProfile } from "@/services/user/get-user-profile";
import axios from "axios";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ProviderUserConfig } from "@/components/provider-user-config";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { PiWarningCircle } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Avatar from "react-avatar-edit";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { AvatarUser } from "@/components/profile/avatar";
import { UserProfile } from "@/components/profile";
import { SidebarContext, SidebarNotifyContext } from "@/shared/context/aside";

const loginFormSchema = z.object({
  email: z.string().optional(),
  contact: z
    .string()
    .regex(/^\d{11}$/, {
      message: "O telefone deve conter exatamente 11 dígitos",
    })
    .optional(),
  username: z
    .string()
    .max(12, {
      message: "O nome de usuário deve ter no máximo 12 caracteres",
    })
    .optional(),
  preferred_currency: z
    .string()
    .max(12, {
      message: "O nome de usuário deve ter no máximo 12 caracteres",
    })
    .optional(),
});
type LoginFormInputs = z.infer<typeof loginFormSchema>;

export const GeralConfig = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<any | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;
  const [preview, setPreview] = useState<any | null>(null);
  const { data, loading } = useUserProfile();
  const { toast } = useToast();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const token = Cookies.get("auth_token");
  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    contact: "",
    username: "",
  });
  const methods = useForm();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  useEffect(() => {
    const hasRequiredFields = Object.values(formData).some(
      (value) => value !== ""
    );
    setIsSubmitDisabled(!(hasRequiredFields || preview)); // Habilitar o botão se algum campo obrigatório estiver preenchido ou se houver uma imagem selecionada
  }, [formData, preview]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });
  function handleOpenModal() {
    setIsOpenModal(!isOpenModal);
  }
  useEffect(() => {
    setFormErrors(errors);
  }, [errors]);

  useEffect(() => {
    const errorMessages = Object.values(formErrors).map(
      (error) => error?.message
    );
    if (errorMessages.length > 0) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: errorMessages.join(", "),
      });
    }
  }, [formErrors, toast]);

  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view: any) => {
    setPreview(view);
    setAvatarUrl(view);
    // Convertendo a imagem cortada para um arquivo File
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

  const handleUpdateProfile = () => {
    handleFileSubmit();
    axios
      .put("https://codeui-api-development.up.railway.app/api/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        setIsOpenNotify(false);
        setIsOpen(false);
        toast({
          variant: "default",
          title: "Sucesso, perfil atualizado!",
          description: "Perfil atualizado com sucesso.",
        });
  
        setTimeout(() => {
          setIsOpenNotify(true);
          setIsOpen(true);
        }, 2000);
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleUpdateProfile)}>
        <section className="flex flex-col gap-10">
          {loading ? (
            <div className="flex flex-col gap-5">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="mt-2 w-full h-[150px]" />
              ))}
            </div>
          ) : (
            <>
              <ProviderUserConfig
                avatar={
                  <div className="text-primary">
                    <div className="flex items-center justify-center flex-col">
                      {preview ? (
                        <Avatar
                        width={150}
                        height={150}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                      />
                      ) : (
                        <AvatarUser
                          size="w-[100px] h-[100px]"
                          avatarUrl={data?.avatar}
                        />
                      )}
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={handleOpenModal}
                        type="button"
    
                      >
                        Alterar avatar
                      </Button>
                    </div>

                    {isOpenModal ? (
                      <section className="w-full fixed top-0 left-0 h-screen backdrop-blur-sm bg-black/75 flex items-center justify-center z-50">
                        <div className="flex flex-col gap-5 bouder">
                          <Avatar
                            width={150}
                            height={150}
                            onCrop={onCrop}
                            onClose={onClose}
                            src={src}
                          />

                          <Button
                            variant="outline"
                            onClick={handleOpenModal}
                            type="button"
                          >
                            Recortar imagem
                          </Button>
                        </div>
                      </section>
                    ) : (
              ''
                    )}
                  </div>
                }
                title="Nome de exibição"
                description="Digite seu nome completo ou um nome de exibição com o qual você se sinta confortável."
                footer="Use no máximo 12 caracteres."
                content={
                  <Input
                    className={`w-72 outline-none ${
                      errors.username
                        ? "outline-none focus-visible:outline-red-500 border-red-500"
                        : ""
                    }`}
                    placeholder={data?.username}
                    {...register("username")}
                    value={formData.username}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        username: e.target.value,
                      }))
                    }
                  />
                }
              />
              <ProviderUserConfig
                title="Contato"
                description="Digite seu número de contato."
                footer="Use no máximo 11 caracteres."
                content={
                  <Input
                    className={`w-72 outline-none${
                      errors.contact
                        ? "outline-none focus-visible:outline-red-500 border-red-500"
                        : ""
                    } ${
                      isInputFocused ? "text-primary" : "text-muted-foreground"
                    }`}
                    onFocus={() => setIsInputFocused(true)}
                    placeholder={data?.contact}
                    {...register("contact")}
                    value={
                      formData.contact === "" ? data?.contact : formData.contact
                    }
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        contact: e.target.value,
                      }))
                    }
                  />
                }
              />
              <ProviderUserConfig
                title="Moeda Preferida"
                description="Todos os valores monetários serão exibidos de acordo com esta seleção."
                footer="Este valor não pode ser alterado manualmente."
                content={
                  <Select defaultValue="BRL" disabled>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Selecione a moeda</SelectLabel>
                        <SelectItem value={"BRL"}>
                          <section className="flex flex-row gap-2 w-full">
                            <Image
                              style={{
                                height: "12px",
                                marginTop: "4px",
                              }}
                              width={20}
                              height={5}
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png"
                              alt="brazil flag"
                            />{" "}
                            <h1>{data?.preferred_currency}</h1>
                          </section>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                }
              />
              <ProviderUserConfig
                title="Email"
                description="Este será o seu email de login e também será utilizado para receber notificações."
                footer={`Email usado durante a compra: ${data?.email}, não pode ser alterado manualmente.`}
                content={
                  <Input
                    disabled
                    className="w-72"
                    placeholder={data?.email}
                    {...register("email")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        email: e.target.value,
                      }))
                    }
                  />
                }
              />
            </>
          )}
        </section>
        <div className="w-full flex border-2 mt-4 rounded-md">
          <div className="flex w-full flex-row items-center flex-1 justify-between py-3 px-4 text-sm">
            <div className="flex flex-row gap-5 items-center">
              <PiWarningCircle size={35} color="#fb6376" />
              <h1 className="text-muted-foreground mr-5">
                Ao confirmar as alterações acima,{" "}
                <span className="text-primary font-semibold">
                  você estará modificando as informações associadas à sua conta
                </span>
                . Essas mudanças podem afetar diretamente a configuração e o
                funcionamento da plataforma.
              </h1>
            </div>
            <section className="rounded-md">
              <Button
                variant="action"
                className="w-36"
                type="submit"
                disabled={isSubmitDisabled}
              >
                Confirmar
              </Button>
            </section>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
