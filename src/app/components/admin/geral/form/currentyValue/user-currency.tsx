"use client"
import { useForm } from "react-hook-form";

import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/src/app/components/ui/select";
import { Button } from "@/src/app/components/ui/button";
import { useToastError } from "@/src/app/shared/hooks/useErrorsInputForm";
import { useToast } from "@/src/app/components/ui/use-toast";

export const UserCurrencyConfig = () => {
  const { toast } = useToast();

  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { formErrors } = useToastError({ errors });
  console.log(formErrors);

  const handleUpdateProfile = (data: any) => {
    console.log(data)
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
                      // onChange={() => setSelectCurrency("BRL")}
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
