import { useState, useEffect } from 'react';

export const useTrialSuporte = () => {
  const [percentageRemainingTryalSuporte, setPercentageRemainingTryalSuporte] = useState<number>(0);
  const [messageTryalSuporte, setMessageTryalSuporte] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date();
    const totalDaysInTwoMonths = 60; // Dois meses considerados com 30 dias cada

    // Calcula os dias restantes até o final dos dois meses
    const daysUntilEndOfTwoMonths = Math.ceil(
      (new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calcula a porcentagem restante com base nos dias até o final dos dois meses
    const percentage = (1 - daysUntilEndOfTwoMonths / totalDaysInTwoMonths) * 100;

    let messageText;

    if (daysUntilEndOfTwoMonths <= 0) {
      messageText = "O suporte tryal expirou!";
    } else if (daysUntilEndOfTwoMonths <= 10) {
      messageText = `Restam: ${daysUntilEndOfTwoMonths} dias de Manutenção e suporte tryal!`;
    } else {
      messageText = `Seu suporte Tryal expira em: ${daysUntilEndOfTwoMonths} dias.`;
    }

    setPercentageRemainingTryalSuporte(percentage);
    setMessageTryalSuporte(messageText);
  }, []); // O array de dependências está vazio para que o efeito só seja executado uma vez no início.

  return { percentageRemainingTryalSuporte, messageTryalSuporte };
};
