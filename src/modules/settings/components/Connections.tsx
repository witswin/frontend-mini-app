import { Text, useToast } from "@chakra-ui/react"
import { useProfile, useProfileDispatch } from "../hooks"
import { CardSection } from "./CardSection"
import { ConnectionCard } from "./ConnectionCard"
import Image from "next/image"
import { axiosClient } from "@/configs/axios"
import { handleApiError } from "@/utils"

export const getTwitterOAuthUrlApi = async (): Promise<string> => {
  const res = await axiosClient.get("/auth/twitter/")
  return res.data.url as string
}

export const Connections = () => {
  const { connections } = useProfile()

  return (
    <CardSection mt="3">
      <Text fontWeight="bold" color="gray.10" fontSize="xl">
        Socials
      </Text>

      <ConnectionCard
        connectedText={
          <>
            <Image
              src="/assets/images/connections/telegram.svg"
              width={16}
              height={16}
              alt="Telegram"
            />
            <span>{connections.Telegram?.username}</span>
          </>
        }
        preventRemove
        preventAdd
        isConnected={!!connections.Telegram}
      >
        <Image
          src="/assets/images/connections/telegram.svg"
          width={16}
          height={16}
          alt="Telegram"
        />
        <span>Telegram</span>
      </ConnectionCard>

      <div className="mt-5"></div>
      <TwitterConnection />
      <div className="mt-5"></div>
      <FarcasterConnection />
      <div className="mt-5"></div>
      <DiscordConnection />
    </CardSection>
  )
}

export const TwitterConnection = () => {
  const { connections } = useProfile()

  const onConnect = () => {
    getTwitterOAuthUrlApi().then((res) => (window.location.href = res))
  }

  return (
    <ConnectionCard
      onConnect={onConnect}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/x.svg"
            width={16}
            height={16}
            alt="Telegram"
          />
          <span>{connections.Twitter?.username}</span>
        </>
      }
      isConnected={!!connections.Twitter && connections.Twitter.isConnected}
    >
      <Image
        src="/assets/images/connections/x.svg"
        width={16}
        height={16}
        alt="Twitter"
      />
      <span>Twitter</span>
    </ConnectionCard>
  )
}

export const DiscordConnection = () => {
  const { connections } = useProfile()

  const onConnect = async () => {
    try {
      const response = await axiosClient.get("/auth/discord/")

      window.location.href = response.data.data
    } catch (error) {
      console.error("Error making API request:", error)
    }
  }

  return (
    <ConnectionCard
      onConnect={onConnect}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/discord.svg"
            width={16}
            height={16}
            alt="Discord"
          />
          <span>{connections.Discord?.username}</span>
        </>
      }
      isConnected={!!connections.Discord && connections.Discord.isConnected}
    >
      <Image
        src="/assets/images/connections/discord.svg"
        width={16}
        height={16}
        alt="Discord"
      />
      <span>Discord</span>
    </ConnectionCard>
  )
}

export const FarcasterConnection = () => {
  const { connections, profile } = useProfile()
  const setState = useProfileDispatch()

  const toast = useToast()

  const onConnect = async () => {
    if (!profile.wallets.length) {
      toast({
        description: "Connect your wallet first!",
        status: "error",
      })
      return
    }

    axiosClient
      .post("/auth/user/connect/farcaster/", {
        userWalletAddress: profile.wallets.at(0).walletAddress,
      })
      .then(() => {
        setState(undefined)
      })
      .catch((e) => {
        handleApiError(e, toast)
      })
  }

  return (
    <ConnectionCard
      onConnect={onConnect}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/farcaster.svg"
            width={16}
            height={16}
            alt="Telegram"
          />
          <span>Connected </span>
        </>
      }
      isConnected={!!connections.Farcaster && connections.Farcaster.isConnected}
    >
      <Image
        src="/assets/images/connections/farcaster.svg"
        width={16}
        height={16}
        alt="Farcaster"
      />
      <span>Farcaster</span>
    </ConnectionCard>
  )
}
