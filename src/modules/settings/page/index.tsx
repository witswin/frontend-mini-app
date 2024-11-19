import { colors } from "@/theme/colors"
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { GalleryAdd, TrashBinTrash, User } from "solar-icon-set"
import { CardSection } from "../components/CardSection"
import Image from "next/image"
import { ConnectionCard } from "../components/ConnectionCard"

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

      <CardSection>
        <Box
          fontSize="small"
          padding={0}
          width={128}
          height={128}
          borderRadius="full"
          background={colors.glassBackground}
          display="grid"
          placeItems="center"
        >
          <User iconStyle="Bold" size={76} />
        </Box>

        <Box
          mt="4"
          gap={2}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          background={colors.glassBackground}
          padding="2"
          borderRadius="8px"
          width="full"
        >
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap={1}
            textColor={colors.gray[20]}
          >
            <GalleryAdd size={25} />
            <Text>Upload Photo</Text>
          </Button>
          <Divider orientation="vertical" height="20px" />
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap={3}
            textColor={colors.gray[20]}
          >
            <TrashBinTrash size={25} />
            <Text>Remove Photo</Text>
          </Button>
        </Box>
      </CardSection>

      <CardSection mt="3">
        <Text fontWeight="bold" color="gray.10" fontSize="xl">
          Account Info
        </Text>
        <FormLabel>
          Username
          <Input
            mt="1"
            background={colors.inputBackground}
            placeholder="People will know you by this name."
          />
        </FormLabel>
        <FormLabel>
          First Name
          <Input
            mt="1"
            background={colors.inputBackground}
            placeholder="Enter your firstname"
          />
        </FormLabel>
        <FormLabel>
          Last Name
          <Input
            mt="1"
            background={colors.inputBackground}
            placeholder="Enter your lastname"
          />
        </FormLabel>
      </CardSection>

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
