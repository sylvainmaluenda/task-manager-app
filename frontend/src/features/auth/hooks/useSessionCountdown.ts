import { useEffect, useMemo, useState } from 'react';
import { authServices } from '@/features/auth/services/auth.service';

type UseSessionCountdownResult = {
  isExpired: boolean;
  expirationDate: string | null;
  secondsLeft: number;
};

const formatExpiration = (exp: number | null): string | null => {
  if (!exp) return null;
  return new Date(exp * 1000).toLocaleString();
};

export const useSessionCountdown = (
  token: string | null,
): UseSessionCountdownResult => {
  const exp = useMemo(() => {
    return token ? authServices.getTokenExpiration(token) : null;
  }, [token]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!exp) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [exp]);

  const isExpired = exp ? now >= exp * 1000 : false;

  const expirationDate = exp ? formatExpiration(exp) : null;

  const remainingTime = exp ? Math.max(exp * 1000 - now, 0) : 0;
  const secondsLeft = Math.ceil(remainingTime / 1000);

  return {
    isExpired,
    expirationDate,
    secondsLeft,
  };
};
