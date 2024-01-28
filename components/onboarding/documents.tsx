import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

function OnboardingDocuments() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setRun(true);
    setSteps([
      {
        content: (
          <h2 className="font-semibold">
            Documentação! <br />{" "}
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
           Aqui você poderá fazer o download dos documentos necessários.
            <br />
          </h2>
        ),
        placement: "bottom",
        target: "#doc-1",
        title: "Documentação do seu projeto",
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

export default OnboardingDocuments;
