import { useState, useEffect } from 'react';

export const useExpirationDomain = () => {
  const [percentageRemaining, setPercentageRemaining] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const expirationDate = new Date("2025-01-01");
    const currentDate = new Date();
    const totalDaysInYear = 365;

    const daysRemaining = Math.ceil(
      (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const percentage = (1 - daysRemaining / totalDaysInYear) * 100;

    let messageText;

    if (daysRemaining <= 0) {
      messageText = "O domínio expirou!";
    } else if (daysRemaining <= 10) {
      messageText = `Renove seu domínio! Restam: ${daysRemaining} dias.`;
    } else {
      messageText = `Seu domínio expira em: ${daysRemaining} dias.`;
    }

    setPercentageRemaining(percentage);
    setMessage(messageText);
  }, []);

  return { percentageRemaining, message };
};
