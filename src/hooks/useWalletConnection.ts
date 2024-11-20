import { useConnect, useDisconnect } from "wagmi";

export const useWalletConnection = () => {
  const { connect, isPending, connectors, isSuccess } = useConnect();

  const { disconnect, isPending: isDisconnectLoading } = useDisconnect();

  const isMetaMaskInstalled =
    typeof window !== "undefined" && window.ethereum?.isMetaMask;

  const connectWallet = () => {
    try {
      return connect({
        connector: isMetaMaskInstalled
          ? connectors.find((connector) => connector.id === "injected")!
          : connectors.find((connector) => connector.id === "walletConnect")!,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    connect: connectWallet,
    isLoading: isPending,
    connectors,
    isSuccess,
    disconnect,
    isDisconnectLoading,
  };
};
