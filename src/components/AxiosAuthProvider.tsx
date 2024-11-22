import { axiosClient } from '@/configs/axios';
import { useAuth } from '@/hooks/useAuthorization';
import { FC, useEffect } from 'react';

export const AxiosAuthProvider: FC = () => {
  const auth = useAuth();

  useEffect(() => {
    // const cookie = getCookie(ACCESS_TOKEN_COOKIE_KEY)
    // if (!cookie) return
    if (!auth) return;

    axiosClient.defaults.headers.common[
      'Authorization'
    ] = `TOKEN ${auth.token}`;
  }, [auth]);

  return null;
};
