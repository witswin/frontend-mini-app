import { axiosClient } from '@/configs/axios';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/constants';
import { useAuthDispatch } from '@/hooks/useAuthorization';
import { UserProfile } from '@/types';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

export const TelegramAuthContext = createContext({
  isWebApp: false,
  isLoginLoading: true,
});

export const TelegramAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWebApp, setIsWebApp] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const dispatch = useAuthDispatch();
  const router = useRouter();

  // const loginWithTelegramWidget = () => {}

  const loginWithTelegramWebApp = useCallback(() => {
    if (!window.Telegram?.WebApp)
      throw new Error('[T] Telegram Web App must be injected');

    setIsLoginLoading(true);
    const payload = window.Telegram.WebApp.initData;

    axiosClient
      .post<UserProfile>('/auth/telegram-login/', { telegramData: payload })
      .then(({ data }) => {
        setCookie(ACCESS_TOKEN_COOKIE_KEY, data.token);

        dispatch(data);
      })
      .finally(() => setIsLoginLoading(false));
  }, [dispatch]);

  const onRouteChange = useCallback(() => {
    const tg = window.Telegram?.WebApp;

    const canGoBack = () => {
      return history.length > 0 && router.asPath !== '/';
    };

    if (router.asPath === '/') {
      tg.BackButton.hide(); // Hide the button on unmount

      return;
    }

    if (canGoBack()) {
      tg.BackButton.show(); // Show the Telegram Back Button

      const onBack = () => {
        history.back();
      };

      tg.BackButton.onClick(onBack);

      return () => {
        tg.BackButton.offClick(onBack); // Cleanup listener
        tg.BackButton.hide(); // Hide the button on unmount
      };
    } else {
      tg.BackButton.hide(); // Hide the button if back is not available
    }
  }, [router]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) return;

    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [onRouteChange, router]);

  useEffect(() => {
    if (!window.Telegram?.WebApp || !window.Telegram.WebApp.initData) return;

    setIsWebApp(true);

    // if (auth) return
    loginWithTelegramWebApp();
  }, [loginWithTelegramWebApp]);

  return (
    <TelegramAuthContext.Provider
      value={{
        isWebApp,
        isLoginLoading,
      }}
    >
      {children}
    </TelegramAuthContext.Provider>
  );
};
