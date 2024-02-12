/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef, useState } from "react";

import Modal from "./Modal";
import { PencilIcon } from "lucide-react";
import { useUser } from "@/src/app/shared/context/userData";
import { useUploadAvatarContext } from "@/src/app/shared/context/avatarUpload";

const Profile = () => {
  const userData = useUser();
  const { setLoading } = useUploadAvatarContext();

  const [avatarUrl, setAvatarUrl] = useState(userData?.avatar); // Use state para controlar o URL do avatar
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc: any) => {
    setLoading(true);
    setAvatarUrl(imgSrc); // Atualize o URL do avatar quando um novo for selecionado
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={avatarUrl ? avatarUrl : userData?.avatar}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-muted"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-primary-foreground hover:bg-muted border-2 border-muted"
          title="Change photo"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon size={15} />
        </button>
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
