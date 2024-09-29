import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { TbHeart, TbWallet } from "react-icons/tb";
import BgImage from "src/assets/BgImage.svg";
import Logo from "src/assets/Logo.svg";

const WalletStatus = (isConnected: boolean = false) => (
  <Box
    bg={isConnected ? "greenRadial" : "redRadial"}
    borderRadius="50px"
    boxSize="7px"
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
      <Image
        position="absolute"
        src={BgImage}
        alt="navbar background image"
        zIndex="base"
        objectFit="fill"
      />

      <HStack zIndex="docked" w="full" justifyContent="space-between" px="12px">
        <VStack>
          <HStack gap="2px">
            <TbHeart size={24} />

            <Badge size="sm" variant={health > 1 ? "green" : "red"}>
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
