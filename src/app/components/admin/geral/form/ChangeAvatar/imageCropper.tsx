/* eslint-disable @next/next/no-img-element */
import { useRef, useState, ChangeEvent } from "react";
import ReactCrop, { Crop, PercentCrop, convertToPixelCrop, makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";
import { useSession } from "next-auth/react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  closeModal: () => void;
  updateAvatar: (dataUrl: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ closeModal, updateAvatar }) => {
    const { data: session } = useSession();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop | PercentCrop | undefined>();
  const [error, setError] = useState<string>("");

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", () => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = imageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
        setImgSrc(imageUrl);
        const crop = makeInitialCrop(naturalWidth, naturalHeight);
        setCrop(crop);
      });
    });
    reader.readAsDataURL(file);
    sendImageToBackend(file); // Chama a função para enviar a imagem para o backend
  };

  const makeInitialCrop = (width: number, height: number): Crop => {
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    return centerCrop(crop, width, height);
  };

  const sendImageToBackend = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("https://codeui-api-production.up.railway.app/api/user/avatar", {
        method: "PATCH",
        body: formData,
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          }
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload image to backend");
      }
   
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image to backend:", error);
    }
  };

  const onImageLoad = (e: React.ChangeEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
           <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
          type="button"
            className="text-xs py-2 px-4 rounded-2xl mt-4 bg-third hover:bg-background text-secondary hover:text-primary "
            onClick={() => {
              if (imgRef.current && previewCanvasRef.current) {
                // location.reload();
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop as Crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                  
                );
              
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                closeModal();
              }
            }}
          >
            Salvar imagem
          </button>
        </div>
      )}
      {crop && (
        <canvas
        ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
