import { axiosClient } from "@/configs/axios";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SignableMessage } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { setCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constants";
import { auth } from "@/globalTypes";

export const AuthState = createContext(undefined);
export const AuthDispatch = createContext(undefined);

interface AuthProvider extends PropsWithChildren {
  auth: auth;
}
export const AuthProvider = ({ children, auth }: AuthProvider) => {
  const [message, setMessage] = useState<{
    message: SignableMessage;
    nonce: string;
  }>({ message: null, nonce: "" });

  const {} = useWalletConnection();
  const { signMessageAsync, ...props } = useSignMessage();
  console.log({ props });

  const { isConnected, address } = useAccount();
  const [state, setState] = useState(auth);

  useEffect(() => {
    if (isConnected && address && !state) {
      axiosClient
        .post("/auth/create-message/", {
          address,
        })
        .then(({ data }) => {
          setMessage({ message: data.message, nonce: data.nonce });
        });
    }
  }, [isConnected]);

  useEffect(() => {
    if (message.message && !state) {
      signMessageAsync({
        message: message.message,
        account: address,
      })
        .then((res) => {
          return axiosClient
            .post("/auth/verify-wallet/", {
              address: address,
              signature: res,
              nonce: message.nonce,
            })
            .then(({ data }) => {
              setCookie(ACCESS_TOKEN_COOKIE_KEY, data.token);
              return data.token;
            });
        })
        .then((token) => {
          axiosClient
            .get("/auth/info/", {
              headers: {
                Authorization: `TOKEN ${token}`,
              },
            })
            .then((res) => {
              setState(res.data);
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [message]);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={setState}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};