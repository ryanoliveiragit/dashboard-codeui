import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

function OnboardingGraphic() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setRun(true);
    setSteps([
      {
        content: (
          <h2 className="font-semibold">
            Olá seja bem vindo! <br />{" "}
            <span className="font-normal">
              A seguir vamos realizar seu onboarding!
            </span>
          </h2>
        ),
        placement: "center",
        target: "body",
      },
      {
        content: (
          <h2>
            Aqui você encontrará o total de visualizações entre 2023 e 2024.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#step-1",
        title: "Total de visualizações",
      },
      {
        content: (
          <h2>
            Aqui você encontrará os locais de acesso dos usuários à sua
            plataforma.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#step-2",
        title: "Tráfego por site",
      },
      {
        content: (
          <h2>
            Ele mostra de onde os usuários estão acessando.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#step-3",
        title: "Tráfego por localização",
      },
      {
        content: (
          <h2>
            Este gráfico apresenta os diferentes tipos de sistemas acessados
            pelos usuários.
          </h2>
        ),
        placement: "bottom",
        target: "#step-4",
        title: "Tipo de sistemas",
      },
      {
        content: (
          <h2>
            Além disso, podemos controlar a data inicial e final de cada gráfico, permitindo uma análise mais detalhada do período desejado
          </h2>
        ),
        placement: "bottom",
        target: "#step-5",
        title: "Filtros",
      },
    ]);
  }, []);

  return (
    <Joyride
      continuous
      callback={() => {}}
      run={run}
      steps={steps}
      hideCloseButton
      scrollToFirstStep
      showSkipButton
      showProgress
      styles={{
        options: {
          arrowColor: "#baedbd",
          backgroundColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#000",
          textColor: "#000",
          width: 400,
          zIndex: 1000,
        },
      }}
    />
  );
}

export default OnboardingGraphic;
