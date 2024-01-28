import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

function OnboardingDespesas() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setRun(true);
    setSteps([
      {
        content: (
          <h2 className="font-semibold">
            Despesas! <br />{" "}
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
            Aqui é onde você encontrará o nome do serviço registrado.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-1",
        title: "Nome do serviço",
      },
      {
        content: (
          <h2>
            A cor vermelha indica que o serviço está expirado.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-2",
        title: "Status: Vermelho",
      },
      {
        content: (
          <h2>
            A cor verde indica que o serviço está ativo.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-3",
        title: "Status: Verde",
      },
      {
        content: (
          <h2>
            Informações adicionais sobre o serviço.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-4",
        title: "Informações",
      },
      {
        content: (
          <h2>
            Indicador de em quanto tempo seu serviço irá expirar.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-5",
        title: "Indicador",
      },
      {
        content: (
          <h2>
            Plano atual ativo.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#desp-6",
        title: "Plano atual",
      },
      {
        content: (
          <h2 className="font-semibold">
            Importante! <br />{" "}
            <span className="font-normal">
              Caso queira mudar algum tipo de informação/plano, contate o
              suporte da plataforma!!
            </span>
          </h2>
        ),
        placement: "center",
        target: "body",
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

export default OnboardingDespesas;
