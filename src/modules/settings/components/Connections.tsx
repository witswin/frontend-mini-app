import { Text } from "@chakra-ui/react"
import { useProfile } from "../hooks"
import { CardSection } from "./CardSection"
import { ConnectionCard } from "./ConnectionCard"
import Image from "next/image"
import { axiosClient } from "@/configs/axios"

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
    </CardSection>
  )
}

export const TwitterConnection = () => {
  const { connections } = useProfile()

  const onConnect = () => {
    // https://app.wits.win/twitter/redirect
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
      isConnected={!!connections.Twitter}
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
