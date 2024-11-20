import { Text, VStack } from "@chakra-ui/react"
import { ProfilePicture } from "../components/ProfilePicture"
import { ProfileInfo } from "../components/ProfileInfo"
import { Connections } from "../components/Connections"

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

      <Connections />
    </div>
  )
}
