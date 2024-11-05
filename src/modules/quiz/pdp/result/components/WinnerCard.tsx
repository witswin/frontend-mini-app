import { Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Avatar from "@/assets/Avatar.svg";
import { textTruncator } from "@/utils";
import { GradientBorder } from "./GradientBorder";
import { BoxShadow } from "./BoxShadow";

export const WinnerCard = ({
  userId,
  publicKey,
  profileAvatar,
}: {
  userId: string;
  publicKey: string;
  profileAvatar?: string;
}) => {
  // temp : we should get the  user's real id
  const id = "0";

  return (
    <HStack
      w="full"
      h={{ base: "40px", sm: "56px" }}
      bg="glassBackground"
      paddingX="8px"
      paddingY="12px"
      justifyContent="space-between"
      borderRadius="8px"
      position="relative"
    >
      {id === userId && <GradientBorder />}

      <BoxShadow />

      <HStack gap="8px">
        <Box borderRadius="50%" boxSize="32px">
          <Image
            src={!!profileAvatar ? profileAvatar : Avatar}
            alt={`profile pic of ${userId}`}
          />
        </Box>
        <Text color="gray.20" fontSize="md" fontWeight={500}>
          {userId}
        </Text>
      </HStack>

      <Text color="gray.60" fontSize="sm" fontWeight={500}>
        {textTruncator(publicKey)}
      </Text>
    </HStack>
  );
};
