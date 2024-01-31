import React, { useState } from "react";
import axios from "axios";
import { AvatarUser } from "@/components/profile/avatar";
import Cookies from 'js-cookie';

const AvatarUploader: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const token = Cookies.get("auth_token");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setFile(file);
    }
  };

  const handleClickAvatar = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.click();
  };

  const handleFileSubmit = async () => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result?.toString();
          if (base64String) {
            try {
              const response = await axios.put("https://codeui-api-production.up.railway.app/api/user", {
                avatar: base64String,
                username: "",
                contact: "",
                preferred_currency: "BR",
              }, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              });
  
              console.log("Perfil atualizado com sucesso:", response.data);
              // Lógica adicional após a atualização do perfil, se necessário
            } catch (error) {
              console.error("Erro ao atualizar o perfil:", error);
              // Tratamento de erro, se necessário
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
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
      <div onClick={handleClickAvatar} className="cursor-pointer w-[175px] h-[175px]">
        <AvatarUser  avatarUrl={"avatarUrl"} />
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default AvatarUploader;
