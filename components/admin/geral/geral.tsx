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
import { Contact } from "lucide-react";
import { PiWarningCircle } from "react-icons/pi";
export const GeralConfig = () => {
  const { data, loading, fetchUserData } = useUserProfile();
  const [newUsername, setNewUsername] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newCurrency, setNewCurrency] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const { toast } = useToast();

  const token = Cookies.get("auth_token");

  const handleUpdateProfile = () => {
    const updatedData = {
      username: newUsername || data?.username,
      contact: newContact || data?.contact,
      preferred_currency: newCurrency || data?.preferred_currency,
    };

    axios
      .put(
        "https://codeui-api-production.up.railway.app/api/user",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        toast({
          variant: "default",
          title: "Sucesso, perfil atualizado!",
          description: "Perfil atualizado com sucesso.",
        });
        setChangesMade(false); // Reset changesMade state after successful update
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

  useEffect(() => {
    const interval = setInterval(fetchUserData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to check if any changes were made
  useEffect(() => {
    if (
      newUsername !== "" ||
      newContact !== "" ||
      newCurrency !== ""
    ) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  }, [newUsername, newContact, newCurrency]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (changesMade) { // Only submit if changes were made
          handleUpdateProfile();
        }
      }}
    >
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
                <Input
                  className="w-72"
                  placeholder={data?.username}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              }
            />
            <ProviderUserConfig
              title="Contato"
              description="Digite seu número de contato."
              footer="Use no máximo 11 caracteres."
              content={
                <Input
                  className="w-72"
                  placeholder={data?.contact}
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
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
                  value={newCurrency}
                  onChange={(e) => setNewCurrency(e.target.value)}
                />
              }
            />
            <ProviderUserConfig
              title="Email"
              description="Digite o seu email."
              footer={`Email atual: ${data?.email}`}
              content={
                <Input
                  className="w-72"
                  placeholder={data?.email}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled
                />
              }
            />
          </>
        )}
      </section>
      <div className="w-full flex border-2 mt-4 rounded-md">
        <div className="flex w-full flex-row items-center flex-1 justify-between py-3 px-4 text-sm">
         <div className="flex flex-row gap-5 items-center">
         <PiWarningCircle size={35} color="#fb6376"/>
          <h1 className="text-muted-foreground mr-5">
            Ao confirmar as alterações acima, <span className="text-primary font-semibold">você estará modificando as
            informações associadas à sua conta</span>. Essas mudanças podem afetar
            diretamente a configuração e o funcionamento da plataforma.
          </h1>
         </div>
          <section className="rounded-md">
            <Button
              variant="default"
              className="w-36"
              type="submit"
              disabled={!changesMade} // Disable button if no changes were made
            >
              Confirmar
            </Button>
          </section>
        </div>
      </div>
    </form>
  );
};
