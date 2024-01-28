import Image from "next/image";
import { Button } from "../ui/button";
import { CiSaveDown2 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
const OnboardingDocuments = dynamic(() => import("../onboarding/documents"), {
  ssr: false,
});
import dynamic from "next/dynamic";

export const Documentations = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de uma requisição assíncrona que leva 2 segundos
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Limpando o timeout ao desmontar o componente (efeito de limpeza)
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <OnboardingDocuments />
      <section className="flex flex-col gap-6">
        {isLoading ? (
          <Skeleton className="mt-2 w-full h-[150px]" />
        ) : (
          <div className="rounded-md bg-accent border-accent p-6 flex gap-4 justify-between">
            <div className="flex gap-4">
              <Image
                className="rounded-md"
                width={100}
                height={100}
                alt="figma image"
                src="https://logowik.com/content/uploads/images/figma.jpg"
              />
              <div className="flex flex-col gap-1 ">
                <h1 className="text-xl">Figma</h1>
                <h1 className="text-sm text-muted-foreground">
                  Design, wireframe, StyleGuide, UI/UX
                </h1>
              </div>
            </div>
            <Button className="flex gap-1 items-center" id="doc-1">
              Download
              <CiSaveDown2 size={17} />
            </Button>
          </div>
        )}
        {isLoading ? (
          <Skeleton className="mt-2 w-full h-[150px]" />
        ) : (
          <div className="rounded-md bg-accent border-accent p-6 flex gap-4 justify-between">
            <div className="flex gap-4">
              <Image
                className="rounded-md"
                width={100}
                height={40}
                alt="figma image"
                src="https://www.nextplc.co.uk/~/media/Images/N/Next-PLC-V2/content-images/image-gallery/logos/next-white-v2-logo.jpg?w=767"
              />
              <div className="flex flex-col gap-1 ">
                <h1 className="text-xl">Projeto</h1>
                <h1 className="text-sm text-muted-foreground">
                  Boas práticas, padrões de commit, Storybook
                </h1>
              </div>
            </div>
            <Button className="flex gap-1 items-center">
              Download
              <CiSaveDown2 size={17} />
            </Button>
          </div>
        )}
      </section>
    </>
  );
};
