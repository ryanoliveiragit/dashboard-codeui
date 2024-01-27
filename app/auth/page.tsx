"use client"
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/api/auth";
import { Button } from "@/components/ui/button";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi2";
function Users() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, setMessageApi] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password, router);
    } catch (error) {
      setMessageApi("Usuario ou senha inválidos");
      console.error("Erro ao fazer login:", "error.message");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessageApi("");
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [messageApi]);

  return (
    <main
      id="client-Area"
      className="bg-gray900 lg:flex-row h-screen w-full  py-[4rem] lg:gap-[17rem] md:gap-0 novo:gap-0 sm:gap-0 flex flex-row justify-center items-center"
    >
      <section className="flex flex-col gap-[1rem]">
        <div className="flex flex-row lg:flex md:hidden sm:hover: novo:hidden text-[#baedbd]">
          <h1 className="text-[2rem] font-light ">...</h1>
          <h1 className="text-[2rem] font-semibold ">UI <span className="text-primary font-extralight">/</span> <i className="font-extralight text-[#95a4fc]">dashboard</i></h1>
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
            onSubmit={handleLogin}
            className="flex flex-col gap-[0.94rem] mt-[1.75rem] relative"
          >
            <div className="relative">
              <MdOutlineEmail
                size={16}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#88ad8a]"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                className="bg-gray900 text-gray-300 pl-11 pr-[.85rem] rounded-md w-full px-3 py-3"
                placeholder="E-mail"
              />
            </div>
            <div className="relative">
              <HiOutlineLockClosed
                
                size={15}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#BAEDBD]"
              />
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
              className="mt-[1.1rem] bg-[#BAEDBD] hover:bg-[#A4CCA6]"
              type="submit"
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

export default Users;
