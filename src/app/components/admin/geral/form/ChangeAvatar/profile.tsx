/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";

import Modal from "./Modal";
import { PencilIcon } from "lucide-react";
import { useUser } from "@/src/app/shared/context/userData";

const Profile = () => {
    const userData = useUser();

  const avatarUrl = useRef(
    "https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/scrolling-gradient.png?fit=1200%2C600&ssl=1"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc: any) => {
    avatarUrl.current = imgSrc;
  };
  return (
    <div className="flex flex-col items-center ">
      <div className="relative">
        <img
          src={userData?.avatar === null ? "https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/scrolling-gradient.png?fit=1200%2C600&ssl=1" : userData?.avatar}
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