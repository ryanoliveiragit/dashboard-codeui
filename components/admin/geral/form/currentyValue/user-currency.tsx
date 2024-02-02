"use client"
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserProfile } from "@/services/user/get-user-profile";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useToastError } from "@/shared/hooks/useErrorsInputForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const UserCurrencyConfig = () => {
  const { toast } = useToast();
  const { data } = useUserProfile();
  const token = Cookies.get("auth_token");
  const [selectedCurrency, setSelectCurrency] = useState(
    data?.preferred_currency
  );
  const {
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log(selectedCurrency);
  const { formErrors } = useToastError({ errors });
  console.log(formErrors);

  const handleUpdateProfile = () => {
    axios
      .patch(
        "https://codeui-api-prodction.up.railway.app/api/currency",
        selectedCurrency,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Perfil atualizado com sucesso:", response.data);
        toast({
          variant: "default",
          title: "Perfil atualizado com sucesso",
          description: "Username",
        });
      })
      .catch((error) => {
        console.error("Erro ao atualizar perfil:", error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar perfil",
          description: "Ocorreu um erro ao atualizar o perfil.",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <section>
        <div className="border w-full p-5 rounded-t-md flex flex-row justify-between">
          <section className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Configurações de Moeda</h1>
            <div>
              <h2 className="text-sm">
                Escolha sua moeda preferida para exibir os valores monetários.
              </h2>
            </div>

            <section className="mt-2">
              <Select defaultValue="BRL">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a Moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Moedas disponíveis</SelectLabel>
                    <SelectItem
                      value="BRL"
                      onChange={() => setSelectCurrency("BRL")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <Image
                          style={{
                            height: "15px",
                          }}
                          width={20}
                          height={20}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png"
                          alt=""
                        />
                        <span>BRL</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
 
            </section>
          </section>
        </div>
        <footer className="border w-full p-5 rounded-b-md text-sm text-muted-foreground flex flex-row justify-between items-center">
        Alterar essa configuração afetará todos os valores exibidos na plataforma.
          <Button className="h-8"  variant="default" type="submit" disabled>
            Salvar
          </Button>
        </footer>
      </section>
    </form>
  );
};
