import { axiosClient } from '@/configs/axios';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/constants';
import { UserProfile } from '@/types';

export const AuthState = createContext<UserProfile>(undefined);
export const AuthDispatch =
  createContext<Dispatch<SetStateAction<UserProfile>>>(undefined);

interface AuthProvider extends PropsWithChildren {
  auth: UserProfile;
}
export const AuthProvider = ({ children, auth }: AuthProvider) => {
  const [state, setState] = useState(auth);

  useEffect(() => {
    if (state) return;
    axiosClient
      .get('/auth/info/', {
        headers: {
          Authorization: `TOKEN ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`,
        },
      })
      .then((res) => {
        setState({ ...res.data, token: getCookie(ACCESS_TOKEN_COOKIE_KEY) });
      })

      .catch((err) => {
        console.warn(err);
      });
  }, [state, getCookie(ACCESS_TOKEN_COOKIE_KEY)]);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={setState}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};
