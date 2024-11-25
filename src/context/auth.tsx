import { axiosClient } from '@/configs/axios';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { SignableMessage } from 'viem';
import { useAccount, useSignMessage } from 'wagmi';
import { setCookie } from 'cookies-next';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/constants';
import { UserProfile } from '@/types';
import { useToast } from '@chakra-ui/react';
import { handleApiError } from '@/utils';

export const AuthState = createContext<UserProfile>(undefined);
export const AuthDispatch =
  createContext<Dispatch<SetStateAction<UserProfile>>>(undefined);

interface AuthProvider extends PropsWithChildren {
  auth: UserProfile;
}
export const AuthProvider = ({ children, auth }: AuthProvider) => {
  const [message, setMessage] = useState<{
    message: SignableMessage;
    nonce: string;
  }>({ message: null, nonce: '' });

  const { disconnect } = useWalletConnection();
  const { signMessageAsync } = useSignMessage();

  const toast = useToast();

  const { isConnected, address } = useAccount();
  const [state, setState] = useState(auth);

  const controller = new AbortController();

  useEffect(() => {
    if (isConnected && address) {
      axiosClient
        .post(
          '/auth/create-message/',
          {
            address,
          },
          { signal: controller.signal },
        )
        .then(({ data }) => {
          setMessage({ message: data.message, nonce: data.nonce });
        });
    }
  }, [isConnected]);

  useEffect(() => {
    // if (window.Telegram.WebApp.initData) return

    if (state && state.wallets.find((item) => item.walletAddress === address))
      return;

    if (message.message) {
      signMessageAsync({
        message: message.message,
        account: address,
      })
        .then((res) => {
          if (!window.Telegram?.WebApp?.initData)
            return axiosClient
              .post('/auth/verify-wallet/', {
                address: address,
                signature: res,
                nonce: message.nonce,
              })
              .then(({ data }) => {
                setCookie(ACCESS_TOKEN_COOKIE_KEY, data.token);
                return data.token;
              });

          const hasWallet = !!state.wallets.length;

          return axiosClient
            .post(hasWallet ? '/auth/change-wallets/' : '/auth/add-wallets/', {
              address: address,
              signature: res,
              nonce: message.nonce,
            })
            .then((res) => {
              toast({
                description: 'Wallet added successfully',
                status: 'success',
              });
              return res;
            })
            .catch((err) => {
              disconnect();
              handleApiError(err, toast);
            });
        })
        .then((token) => {
          axiosClient
            .get('/auth/info/', {
              headers: {
                Authorization: `TOKEN ${token}`,
              },
            })
            .then((res) => {
              setState({ ...res.data, token });
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [message, state]);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={setState}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};
