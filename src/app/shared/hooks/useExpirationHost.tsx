import { useState, useEffect } from 'react';

export const useExpirationHost = () => {
  const [percentageRemainingHost, setPercentageRemainingHost] = useState<number>(0);
  const [messageHost, setMessage] = useState<string>('');

  useEffect(() => {
    const expirationDate = new Date("2025-01-01");
    const currentDate = new Date();
    const totalDaysInMonth = 30;

    // Calcula os dias restantes até o final do mês atual
    const daysUntilEndOfMonth = Math.ceil(
      (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calcula a porcentagem restante com base nos dias até o final do mês
    const percentage = (1 - daysUntilEndOfMonth / totalDaysInMonth) * 100;

    let messageText;

    if (daysUntilEndOfMonth <= 0) {
      messageText = "A Host expirou!";
    } else if (daysUntilEndOfMonth <= 10) {
      messageText = `Renove sua Host! Restam: ${daysUntilEndOfMonth} dias.`;
    } else {
      messageText = `Sua host expira em: ${daysUntilEndOfMonth} dias.`;
    }

    setPercentageRemainingHost(percentage);
    setMessage(messageText);
  }, []); // O array de dependências está vazio para que o efeito só seja executado uma vez no início.

  return { percentageRemainingHost, messageHost };
};
