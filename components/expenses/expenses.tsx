"use client";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { Progress } from "@/components/ui/progress";
import { AvatarUser } from "../profile/avatar";
import { useExpirationDomain } from "@/shared/hooks/useExpirationDomain";
import { useExpirationHost } from "@/shared/hooks/useExpirationHost";
import { useTrialSuporte } from "@/shared/hooks/useTrialSuport";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const OnboardingDespesas = dynamic(() => import("../onboarding/despesas"), {
  ssr: false,
});
export const Expenses = () => {
  const { percentageRemaining, message } = useExpirationDomain();
  const { percentageRemainingHost, messageHost } = useExpirationHost();
  const { percentageRemainingTryalSuporte, messageTryalSuporte } =
    useTrialSuporte();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem(
      "onboardingDespesasCompleted"
    );
    if (!onboardingCompleted) {
      localStorage.setItem("onboardingDespesasCompleted", "true");
      setOnboardingCompleted(false);
    } else {
      setOnboardingCompleted(true);
    }
  }, []);
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
    <section>
      {!onboardingCompleted && <OnboardingDespesas />}
      {isLoading ? (
        <Skeleton className="mt-6 w-full h-[190px]" />
      ) : (
        <>
          <div
            className="rounded-md bg-accent border-accent border-l-4 border-green-300"
            id="desp-3"
          >
            <div className="p-6 flex justify-between">
              <nav className="flex flex-row gap-10">
                <section className="">
                  <h1 className="font-semibold text-lg" id="desp-1">
                    Domínio web
                  </h1>
                  <ul
                    className="flex gap-4 text-sm text-muted-foreground mt-4"
                    id="desp-4"
                  >
                    <li className="flex gap-2 items-center">
                      <CiUser size={14} /> Portfolio
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiLocationOn size={14} /> SP, Suzano
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiMail size={14} /> ryanoliveirasp@icloud.com.br
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-col gap-2" id="desp-5">
                    <h3 className="text-sm">{message}</h3>
                    <Progress value={percentageRemaining} />
                  </div>
                </section>

                <div className="py-5 flex flex-row gap-10 items-center w-[15rem]">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1">
                    <span className="text-sm">
                      Site: <strong>www.registro.br</strong>
                    </span>
                    <span className="text-sm font-normal">
                      Usuário:{" "}
                      <span className="text-lg font-semibold">RYAN01</span>
                    </span>
                  </header>
                </div>

                <div className="py-5 flex flex-row gap-10 items-center">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1" id="desp-6">
                    <span className="text-sm">
                      Plano atual: <strong>Anual</strong>
                    </span>
                    <span className="text-xl font-semibold">
                      R$ 50,00 <span className="text-sm font-normal">/Ano</span>
                    </span>
                  </header>
                </div>
              </nav>
              <section>
                <AvatarUser avatarUrl="" />
              </section>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <Skeleton className="mt-6 w-full h-[190px]" />
      ) : (
        <>
          <div className="rounded-md bg-accent border-accent border-l-4 border-green-300 mt-6">
            <div className="p-6 flex justify-between">
              <nav className="flex flex-row gap-10">
                <section className="">
                  <h1 className="font-semibold text-lg">Hosting</h1>
                  <ul className="flex gap-4 text-sm text-muted-foreground mt-4">
                    <li className="flex gap-2 items-center">
                      <CiUser size={14} /> Portfolio
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiLocationOn size={14} /> SP, Suzano
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiMail size={14} /> ryanoliveirasp@icloud.com.br
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-col gap-2">
                    <h3 className="text-sm">{messageHost}</h3>
                    <Progress value={percentageRemainingHost} />
                  </div>
                </section>

                <div className="py-5 flex flex-row gap-10 items-center w-[15rem]">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1">
                    <span className="text-sm">
                      Site: <strong>www.hostgator.com.br</strong>
                    </span>
                    <span className="text-sm font-normal">
                      Usuário:{" "}
                      <span className="text-lg font-semibold">RYOLI2</span>
                    </span>
                  </header>
                </div>

                <div className="py-5 flex flex-row gap-10 items-center">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1">
                    <span className="text-sm">
                      Plano atual: <strong>Mensal</strong>
                    </span>
                    <span className="text-xl font-semibold">
                      R$ 250,00{" "}
                      <span className="text-sm font-normal">/Mês</span>
                    </span>
                  </header>
                </div>
              </nav>
              <section>
                <AvatarUser avatarUrl="" />
              </section>
            </div>
          </div>
        </>
      )}
      {isLoading ? (
        <Skeleton className="mt-6 w-full h-[190px]" />
      ) : (
        <>
          <div className="rounded-md bg-accent border-accent border-l-4 border-green-300 mt-6">
            <div className="p-6 flex justify-between">
              <nav className="flex flex-row gap-10">
                <section className="">
                  <h1 className="font-semibold text-lg">
                    Manutenção e Suporte
                  </h1>
                  <ul className="flex gap-4 text-sm text-muted-foreground mt-4">
                    <li className="flex gap-2 items-center">
                      <CiUser size={14} /> Portfolio
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiLocationOn size={14} /> SP, Suzano
                    </li>
                    <li className="flex gap-2 items-center">
                      <CiMail size={14} /> ryanoliveirasp@icloud.com.br
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-col gap-2">
                    <h3 className="text-sm">{messageTryalSuporte}</h3>
                    <Progress value={percentageRemainingTryalSuporte} />
                  </div>
                </section>

                <div className="py-5 flex flex-row gap-10 items-center w-[15rem]">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1">
                    <span className="text-sm">
                      Site: <strong>www.codeui.com.br</strong>
                    </span>
                    <span className="text-sm font-normal">
                      Responsavel:{" "}
                      <span className="text-lg font-semibold">
                        Ryan Oliveira
                      </span>
                    </span>
                  </header>
                </div>

                <div className="py-5 flex flex-row gap-10 items-center">
                  <div className="border-l border-muted-foreground h-full"></div>
                  <header className="flex flex-col gap-1">
                    <span className="text-sm">
                      Plano atual: <strong>Tryal</strong>
                    </span>
                    <span className="text-xl font-semibold">
                      R$ 0,00 <span className="text-sm font-normal">/Mês</span>
                    </span>
                  </header>
                </div>
              </nav>
              <section>
                <AvatarUser avatarUrl="" />
              </section>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <Skeleton className="mt-6 w-full h-[190px]" />
      ) : (
        <div
          className="rounded-md bg-accent border-accent border-l-4 border-red-300 mt-6"
          id="desp-2"
        >
          <div className="p-6 flex justify-between">
            <nav className="flex flex-row gap-10">
              <section className="">
                <h1 className="font-semibold text-lg">Teste</h1>
                <ul className="flex gap-4 text-sm text-muted-foreground mt-4">
                  <li className="flex gap-2 items-center">
                    <CiUser size={14} /> Portfolio
                  </li>
                  <li className="flex gap-2 items-center">
                    <CiLocationOn size={14} /> SP, Suzano
                  </li>
                  <li className="flex gap-2 items-center">
                    <CiMail size={14} /> ryanoliveirasp@icloud.com.br
                  </li>
                </ul>

                <div className="mt-4 flex flex-col gap-2">
                  <h3 className="text-sm">Seu teste expirou!</h3>
                  <Progress value={100} />
                </div>
              </section>

              <div className="py-5 flex flex-row gap-10 items-center w-[15rem]">
                <div className="border-l border-muted-foreground h-full"></div>
                <header className="flex flex-col gap-1">
                  <span className="text-sm">
                    Site: <strong>www.teste.com.br</strong>
                  </span>
                  <span className="text-sm font-normal">
                    Usuário:{" "}
                    <span className="text-lg font-semibold">TESTE23</span>
                  </span>
                </header>
              </div>

              <div className="py-5 flex flex-row gap-10 items-center">
                <div className="border-l border-muted-foreground h-full"></div>
                <header className="flex flex-col gap-1">
                  <span className="text-sm">
                    Plano: <strong>Mensal</strong>
                  </span>
                  <span className="text-xl font-semibold">
                    R$ 250,00 <span className="text-sm font-normal">/Mês</span>
                  </span>
                  {percentageRemainingHost < 30 ? (
                    <div className="mt-1 flex flex-col gap-2">
                      <Button variant="default">Contratar Agora</Button>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-2">
                      <h3 className="text-sm">{messageHost}</h3>
                      <Progress value={percentageRemainingHost} />
                    </div>
                  )}
                </header>
              </div>
            </nav>
            <section>
              <AvatarUser avatarUrl="" />
            </section>
          </div>
        </div>
      )}
    </section>
  );
};
