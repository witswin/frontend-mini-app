import { Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Avatar from "@/assets/Avatar.svg";

export const WinnerCard = ({
  userId,
  publicKey,
  profileAvatar,
  isCurrentPlayerInWinners,
}: {
  userId: string;
  publicKey: string;
  profileAvatar?: string;
  isCurrentPlayerInWinners?: boolean;
}) => {
  return (
    <HStack
      w="full"
      h={{base:'40px',sm:"56px"}}
      bg="glassBackground"
      paddingX="8px"
      paddingY="12px"
      justifyContent="space-between"
      borderRadius="8px"
      position="relative"
      // border={
      //   isCurrentPlayerInWinners
      //     ? "1px solid var(--chakra-colors-cyan)"
      //     : "unset"
      // }
    >
      {isCurrentPlayerInWinners && (
        <>
          <Box
            zIndex={-1}
            position="absolute"
            left="50%"
            top="50%"
            bg="primaryLinear"
            height="full"
            w="calc(100%)"
            h="calc(100%)"
            transform="translate(-50%,-50%)"
            borderRadius="8px"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            borderRadius="md"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            zIndex={-1}
            bg="gray.900"
            transform="translate(-50%,-50%)"
          />
        </>
      )}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(110, 129, 238, 0.2)"
        borderRadius="md"
        opacity={0.7}
        pointerEvents="none"
      />
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
        {/* todo add truncate */}
        {publicKey}
      </Text>
    </HStack>
  );
};
