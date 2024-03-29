"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { Button } from "../components/ui/button";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, setMessageApi] = useState("");
  const router = useRouter();
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessageApi(result.error);
      console.log(result.error)
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main
      id="client-Area"
      className="bg-gray900 lg:flex-row h-screen w-full  py-[4rem] lg:gap-[17rem] md:gap-0 novo:gap-0 sm:gap-0 flex flex-row justify-center items-center"
    >
      <section className="flex flex-col gap-[1rem]">
        <div className="flex flex-row lg:flex md:hidden sm:hover: novo:hidden">
          <h1 className="text-[2rem] font-light ">code</h1>
          <h1 className="text-[2rem] font-semibold ">
            UI <span className="text-primary font-extralight">/</span>{" "}
            <i className="font-extralight ">dashboard</i>
          </h1>
        </div>
        <h1 className="text-[4rem] lg:flex md:hidden sm:hover: novo:hidden text-gradient-to-r font-normal max-w-[28rem] leading-tight">
          Faça seu login na plataforma.
        </h1>
      </section>

      <section className="bg-purple900 rounded-md px-[1.94rem] py-[2.44rem] w-[25.1875rem]">
        <div className="flex flex-col gap-[0.37rem]">
          <h1 className="text-[1.875rem] font-semibold text-white">
            Área do cliente
          </h1>
          <h1 className="text-[0.825rem] font-normal text-white">
            Controle em tempo real sobre o seu projeto!
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[0.94rem] mt-[1.75rem] relative"
          >
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                className="bg-gray900 text-gray-300 pl-11 pr-[.85rem] rounded-md w-full px-3 py-3"
                placeholder="E-mail"
              />
            </div>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                className="bg-gray900 text-gray-300 pl-11 pr-[.85rem] rounded-md w-full px-3 py-3"
                placeholder="Senha"
              />
            </div>
            <div className="text-red-500 text-[12px] absolute top-[118px]">
              <span>{messageApi}</span>
            </div>
            <label className="text-primary text-end" htmlFor="">
              Esqueci minha senha
            </label>

            <Button
              className="mt-[1.1rem]  "
              type="submit"
              variant="default"
              disabled={password.length == 0}
            >
              <h1 className="text-[0.875rem]">ENTRAR</h1>
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Home;