import { useConnect, useDisconnect } from "wagmi";

export const useWalletConnection = () => {
  const { connect, isPending, connectors, isSuccess } = useConnect();

  const { disconnect, isPending: isDisconnectLoading } = useDisconnect();

  return {
    connect,
    isLoading: isPending,
    connectors,
    isSuccess,
    disconnect,
    isDisconnectLoading,
  };
};
