import { Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Avatar from "@/assets/Avatar.svg";
import { textTruncator } from "@/utils";
import { GradientBorder } from "./GradientBorder";
import { BoxShadow } from "./BoxShadow";
import { useRouter } from "next/router";

export const WinnerCard = ({
  name,
  walletAddress,
  profileAvatar,
  isSelfUser,
  username,
  userId,
}: {
  name: string;
  walletAddress: string;
  profileAvatar?: string;
  isSelfUser: boolean;
  username: string;
  userId: number;
}) => {
  const router = useRouter();
  return (
    <HStack
      cursor="pointer"
      onClick={() => router.push(`/profile/${userId}`)}
      w="full"
      h={{ base: "40px", sm: "56px" }}
      bg="glassBackground"
      paddingX="8px"
      paddingY="12px"
      justifyContent="space-between"
      borderRadius="8px"
      position="relative"
    >
      {isSelfUser && <GradientBorder />}

      <BoxShadow />

      <HStack gap="8px">
        <Box borderRadius="50%" boxSize="32px">
          <Image
            src={!!profileAvatar ? profileAvatar : Avatar}
            alt={`profile pic of ${name}`}
          />
        </Box>
        <Text color="gray.20" fontSize="md" fontWeight={500}>
          {name}
        </Text>
      </HStack>

      <Text color="gray.60" fontSize="sm" fontWeight={500}>
        {walletAddress ? textTruncator(walletAddress) : username}
      </Text>
    </HStack>
  );
};
