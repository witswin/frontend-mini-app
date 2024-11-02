import { axiosClient } from "@/configs/axios";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SignableMessage } from "viem";
import { useAccount, useSignMessage } from "wagmi";

export const AuthState = createContext(undefined);
export const AuthDispatch = createContext(undefined);

interface AuthProvider extends PropsWithChildren {}
export const AuthProvider = ({ children }: AuthProvider) => {
  const [message, setMessage] = useState<{
    message: SignableMessage;
    nonce: string;
  }>({ message: null, nonce: "" });

  const {} = useWalletConnection();
  const { signMessageAsync, ...props } = useSignMessage();
  console.log({ props });

  const { isConnected, address } = useAccount();
  const [state, setState] = useState();

  useEffect(() => {
    if (isConnected && address) {
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
    if (message.message) {
      signMessageAsync({
        message: message.message,
        account: address,
      })
        .then((res) => {
          axiosClient
            .post("/auth/authenticate/", {
              address: address,
              signature: res,
              message: message.message,
            })
            .then((response) => {
              console.log({ response });
            });
        })
        .catch((err) => {
          console.warn(err);
          console.log({ err });
        });
    }
  }, [message]);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={setState}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};
