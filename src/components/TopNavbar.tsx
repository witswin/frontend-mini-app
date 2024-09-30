import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { TbHeart, TbWallet } from "react-icons/tb";
import BgImage from "@/assets/BgImage.svg";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";

const WalletStatus = (isConnected: boolean = false) => (
  <Badge
    variant={isConnected ? "green" : "red"}
    size="xs"
    position="absolute"
    left="0"
    bottom="0"
  />
);

export const TopNavbar = () => {
  const health = 3;
  const isConnected = true;

  return (
    <HStack
      h="90px"
      w="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box
        position="absolute"
        zIndex="base"
        width="100%"
        height="100%"
        pt="10px"
      >
        <Image src={BgImage} alt="navbar background image" layout="fill" />
      </Box>

      <HStack zIndex="docked" w="full" justifyContent="space-between" px="12px">
        <VStack>
          <HStack gap="2px">
            <TbHeart size={24} />

            <Badge size="sm" variant="ghost">
              {"x "}
              {health}
            </Badge>
          </HStack>
          <Text color="gray.40" fontSize="sm" fontWeight="bold">
            Health
          </Text>
        </VStack>

        <VStack>
          <Image src={Logo} alt="logo" />
        </VStack>

        <VStack mr="4px">
          <Box position="relative">
            <TbWallet size={24} />
            {WalletStatus(isConnected)}
          </Box>
          <Text color="gray.40" fontSize="sm" fontWeight="bold">
            Wallet
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};
