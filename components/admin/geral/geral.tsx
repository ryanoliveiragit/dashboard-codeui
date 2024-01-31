import { useState, useEffect } from "react";
import { useUserProfile } from "@/services/user/get-user-profile";
import axios from "axios";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ProviderUserConfig } from "@/components/provider-user-config";
import AvatarUploader from "@/services/user/avatar/change-avatar";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { PiWarningCircle } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginFormSchema = z.object({
  email: z.string().optional(), // Tornando o campo de e-mail opcional
  contact: z
    .string()
    .regex(/^\d{11}$/, {
      message: "O telefone deve conter exatamente 11 dígitos",
    })
    .optional(),
  username: z
    .string()
    .max(12) // Limitando a 12 caracteres

    .optional(), // Tornando o campo de username opcional
  preferred_currency: z.any().optional(), // Tornando o campo de moeda preferida opcional
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;
export const GeralConfig = () => {
  const { data, loading, fetchUserData } = useUserProfile();
  const { toast } = useToast();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  const token = Cookies.get("auth_token");
  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    contact: "",
    username: "",
    preferred_currency: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Estado para rastrear se o botão de envio deve ser desabilitado

  useEffect(() => {
    // Verificar se algum campo obrigatório está preenchido
    const hasRequiredFields = Object.values(formData).some(
      (value) => value !== ""
    );
    setIsSubmitDisabled(!hasRequiredFields);
  }, [formData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleUpdateProfile = () => {
    axios
      .put("https://codeui-api-production.up.railway.app/api/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        toast({
          variant: "default",
          title: "Sucesso, perfil atualizado!",
          description: "Perfil atualizado com sucesso.",
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

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
              title="Nome de exibição"
              description="Digite seu nome completo ou um nome de exibição com o qual você se sinta confortável."
              footer="Use no máximo 32 caracteres."
              content={
                <Input
                  className={`w-72 outline-none ${
                    errors.username
                      ? "outline-none focus-visible:outline-red-500"
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
                      ? "outline-none focus-visible:outline-red-500"
                      : ""
                  } ${isInputFocused ? "text-primary" : "text-muted-foreground"}`}
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
              description="Digite a moeda que você prefere."
              footer="Use no máximo 2 caracteres."
              content={
                <Input
                  className="w-72"
                  placeholder={data?.preferred_currency}
                  {...register("preferred_currency")}
                  value={formData.preferred_currency}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      preferred_currency: e.target.value,
                    }))
                  }
                />
              }
            />
            <ProviderUserConfig
              title="Email"
              description="Digite o seu email."
              footer={`Email atual: ${data?.email}`}
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
              variant="default"
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
  );
};
