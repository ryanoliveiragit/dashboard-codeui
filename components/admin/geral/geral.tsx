import { ProviderUserConfig } from "@/components/provider-user-config";
import { Input } from "@/components/ui/input";
import AvatarUploader from "@/services/user/avatar/change-avatar";
import { useUserProfile } from "@/services/user/get-user-profile";
import { useState } from "react";
import axios from "axios"; // Importe o Axios
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "@/components/ui/button";

export const GeralConfig = () => {
  const { data, loading, error } = useUserProfile();
  const [newUsername, setNewUsername] = useState(""); // Estado para armazenar o novo username
  const [newContact, setNewContact] = useState("");
  const [newCurrency, setNewCurrency] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const token = Cookies.get("auth_token");
  const { toast } = useToast();
  const handleUpdateProfile = (updatedData: any) => {
    axios
      .put(
        "https://codeui-api-development.up.railway.app/api/user",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        toast({
          title: "Atualização concluída",
          color: "#000",
          description: "Suas informações foram atualizadas com êxito.",
        });
      })
      .catch((error) => {
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Atualização não concluida.",
              description: `Erro: ${error}`,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>;
      });
  };

  return (
    <section className="flex flex-col gap-10">
      {loading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="mt-2 w-full h-[150px]" />
          <Skeleton className="mt-2 w-full h-[150px]" />
          <Skeleton className="mt-2 w-full h-[150px]" />
          <Skeleton className="mt-2 w-full h-[150px]" />
        </div>
      ) : (
        <>
          <ProviderUserConfig
            title="Avatar"
            subTitle="Este é o seu avatar."
            description="Clique no avatar para fazer upload de um personalizado de seus arquivos."
            footer="Um avatar é opcional, mas altamente recomendado."
            avatar={<AvatarUploader />}
          />
          <ProviderUserConfig
            title="Nome de exibição"
            description="Digite seu nome completo ou um nome de exibição com o qual você se sinta confortável."
            footer="Use no máximo 32 caracteres."
            content={
              <>
                <Input
                  className="w-72"
                  placeholder={data?.username}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </>
            }
            action={() =>
              handleUpdateProfile({ ...data, username: newUsername })
            }
          />
          <ProviderUserConfig
            title="Contato"
            description="Digite seu número de contato."
            footer="Use no máximo 11 caracteres."
            content={
              <>
                <Input
                  className="w-72"
                  placeholder={data?.contact}
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                />
              </>
            }
            action={() => handleUpdateProfile({ ...data, contact: newContact })}
          />
          <ProviderUserConfig
            title="Moeda Preferida"
            description="Digite a moeda que você prefere."
            footer="Use no máximo 2 caracteres."
            content={
              <>
                <Input
                  className="w-72"
                  placeholder={data?.preferred_currency}
                  value={newCurrency}
                  onChange={(e) => setNewCurrency(e.target.value)}
                />
              </>
            }
            action={() =>
              handleUpdateProfile({
                ...data,
                preferred_currency: newCurrency,
              })
            }
          />
          <ProviderUserConfig
            title="Email"
            description="Digite o seu email."
            footer={`Email atual: ${data?.email}`}
            content={
              <>
                <Input
                  className="w-72"
                  placeholder={data?.email}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled
                />
              </>
            }
          />
        </>
      )}
    </section>
  );
};
