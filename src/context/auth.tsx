import { axiosClient } from '@/configs/axios';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
          Authorization: `TOKEN ${state?.token}`,
        },
      })
      .then((res) => {
        setState({ ...res.data, token: state?.token });
      })

      .catch((err) => {
        console.warn(err);
      });
  }, [state]);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={setState}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};
