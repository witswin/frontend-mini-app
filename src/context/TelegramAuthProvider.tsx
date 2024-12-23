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

    const basePath = router.asPath.split(/[?#]/)[0];

    if (basePath === '/') {
      tg.BackButton.hide(); // Hide the button on unmount

      return;
    }
    console.log(history.length,"ssss");
    

    const canGoBack = () => {
      return history.length > 0 || router.asPath !== '/';
    };

    if (canGoBack()) {
      tg.BackButton.show(); // Show the Telegram Back Button

      if (!history.length) {
        router.push('/');
      }

      router.back();
    } else {
      tg.BackButton.hide(); // Hide the button if back is not available
    }
  }, [router]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) return;

    tg.onEvent('backButtonClicked', onRouteChange);
    return () => tg.offEvent('backButtonClicked', onRouteChange);
  }, [onRouteChange, router]);

  //handle close button
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const basePath = router.asPath.split(/[?#]/)[0];

    if (!tg) return;
    if (basePath === '/') {
      tg.BackButton.hide();
      tg.BackButton.hide();
      tg.MainButton.onClick(() => {
        tg.close();
      });
    } else {
      tg.MainButton.hide();
      tg.BackButton.show();
    }
    return () => {
      if (tg) {
        tg.offEvent('backButtonClicked', onRouteChange);
      }
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
