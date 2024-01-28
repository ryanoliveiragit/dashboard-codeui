import React, { useState } from "react";
import axios from "axios";
import { AvatarUser } from "@/components/profile/avatar";

const AvatarUploader: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // get the selected file from the input
    const file = event.target.files?.[0];
    if (!file) return;

    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post("http://localhost:3000/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
        setAvatarUrl(response.data.avatarUrl); // Assuming the response contains the URL of the uploaded avatar
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const handleClickAvatar = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.click();
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <div onClick={handleClickAvatar} className="cursor-pointer">
        <AvatarUser size="h-[75px] w-[75px]" avatarUrl={avatarUrl} />
      </div>
    </div>
  );
};

export default AvatarUploader;
