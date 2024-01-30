import { CiCirclePlus } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { GoPlus } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "../ui/badge";

const plans = [
  {
    title: "Free",
    description:
      "Acesso completo ao dashboard, suporte por email e documentações.",
    price: "R$ 0",
    content: [
      "Analytics",
      "Suporte",
      "Documentação",
      "Despesas",
      "Até 1 Projeto",
    ],
    blocked: [
      "Mais de um projeto",
      "Suporte 24hrs",
      "Relatórios personalizados",
    ],
  },
  {
    title: "Pro",
    description:
      "Acesso completo ao dashboard, suporte por email e documentações.",
    price: "R$ 20",
    content: [
      "Analytics",
      "Suporte",
      "Documentação",
      "Despesas",
    ],
    notBlocked: [
      "Mais de um projeto",
      "Suporte 24hrs",
      "Relatórios personalizados",
    ],
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Plans({ className, ...props }: CardProps) {
  const [activePlan, setActivePlan] = useState("Pro");

  return (
    <section className="flex flex-row ml-40 flex-wrap gap-10">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={cn(
            "w-[400px] ",
            activePlan === plan.title && plan.title === "Pro"
              ? "border-yellow-300 border-2"
              : activePlan === plan.title && "border-gray-600 border-2",
            className
          )}
          {...props}
        >
          <div className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl flex flex-row items-center gap-4">
                {activePlan === plan.title ? (
                  <>
                    {plan.title}{" "}
                    <Badge
                      variant="default"
                      className={
                        activePlan === "Pro"
                          ? "h-5 flex items-center justify-center bg-gradient-to-r from-amber-200 to-yellow-500"
                          : "h-5 flex items-center justify-center bg-gray-400"
                      }
                    >
                      Ativo
                    </Badge>
                  </>
                ) : (
                  plan.title
                )}
              </CardTitle>
              <CardTitle className="text-4xl font-bold">{plan.price}<span className="text-sm font-normal"> /mês</span></CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              {plan.content.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 ">
                  <FaCheckCircle className="h-8 w-4 text-white fill-white fi" />
                  <p className="text-sm font-normal text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
              {plan.notBlocked?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <GoPlus size={25} className="h-8 w-4 text-white" />
                  <p className="text-sm font-normal text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" disabled={activePlan === plan.title}>
                {activePlan === plan.title ? "Plano ativo" : "Fazer upgrade"}
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </section>
  );
}
