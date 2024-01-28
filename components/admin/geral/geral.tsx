import { AvatarUser } from "@/components/profile/avatar";
import { ProviderUserConfig } from "@/components/provider-user-config";
import { Input } from "@/components/ui/input";
import AvatarUploader from "@/services/user/avatar/change-avatar";
import { useUserProfile } from "@/services/user/get-user-profile";
import { useUserID } from "@/shared/hooks/useProfileID";

export const GeralConfig = () => {
  const userData = useUserID();
  return (
    <section className="flex flex-col gap-10">
      <ProviderUserConfig
        title="Avatar"
        subTitle="Este é o seu avatar."
        description="Clique no avatar para fazer upload de um personalizado de seus
    arquivos."
        footer="Um avatar é opcional, mas altamente recomendado."
        avatar={<AvatarUploader />}
      />
      <ProviderUserConfig
        title="Nome de exibição"
        description="Digite seu nome completo ou um nome de exibição com o qual você se sinta confortável."
        footer="Use no máximo 32 caracteres."
        content={
          <Input
            className="max-w-72"
            placeholder={`${userData.user?.fullName}`}
          />
        }
        action="s"
      />

      <ProviderUserConfig
        title="E-mail"
        description="Por favor, insira o endereço de e-mail que deseja usar para fazer login na plataforma ."
        footer="Enviaremos um email para você para verificar a alteração."
        content={
          <Input className="max-w-72" placeholder={`${userData.user?.email}`} />
        }
        action="s"
      />
    </section>
  );
};
