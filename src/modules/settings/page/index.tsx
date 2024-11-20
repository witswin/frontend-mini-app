import { Text, VStack } from "@chakra-ui/react"
import { CardSection } from "../components/CardSection"
import Image from "next/image"
import { ConnectionCard } from "../components/ConnectionCard"
import { ProfilePicture } from "../components/ProfilePicture"
import { ProfileInfo } from "../components/ProfileInfo"

export const SettingsPage = () => {
  return (
    <div>
      <VStack width="full" mb="8px">
        <Text fontWeight="bold" color="gray.10" mt="5" fontSize="5xl">
          Account Settings
        </Text>
        <Text
          fontWeight="600"
          color="gray.60"
          fontSize="md"
          textAlign="center"
          mx="auto"
          mt="4px"
          mb="24px"
        >
          Reading the resources increases your chances of winning
        </Text>
      </VStack>

      <ProfilePicture />

      <ProfileInfo />

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
              <span>@Alimak0</span>
            </>
          }
          isConnected={true}
        >
          <Image
            src="/assets/images/connections/telegram.svg"
            width={16}
            height={16}
            alt="Telegram"
          />
          <span>Telegram</span>
        </ConnectionCard>
      </CardSection>
    </div>
  )
}
