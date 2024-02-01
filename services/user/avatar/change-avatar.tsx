import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AvatarUser } from "@/components/profile/avatar";
import Cookies from 'js-cookie';
import { SidebarContext, SidebarNotifyContext } from "@/shared/context/aside";

const AvatarUploader: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const token = Cookies.get("auth_token");
  const { isOpenNotify, setIsOpenNotify } = useContext(SidebarNotifyContext)!;
  const { isOpen, setIsOpen } = useContext(SidebarContext)!;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setFile(file);
    }
  };

  const handleFileSubmit = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);

        const response = await axios.patch("https://codeui-api-development.up.railway.app/api/user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("Perfil atualizado com sucesso:", response.data);
        // Alterar o estado para aberto temporariamente
        setIsOpenNotify(!isOpenNotify);
        setIsOpen(!setIsOpen);

        // Após 1 segundo, reverter ao estado original
        setTimeout(() => {
          setIsOpenNotify(!isOpenNotify);
          setIsOpen(!setIsOpen);
        }, 1000);
      } catch (error) {
        console.error("Erro ao atualizar o perfil:", error);
        // Tratamento de erro, se necessário
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <div onClick={() => document.getElementById("file-input")?.click()} className="cursor-pointer w-[175px] h-[175px]">
        <AvatarUser avatarUrl={avatarUrl} />
      </div>
      <button onClick={handleFileSubmit}>Enviar</button>
    </div>
  );
};

export default AvatarUploader;
