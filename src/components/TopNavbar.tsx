import {
  Badge,
  Box,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { TbHeart, TbWallet } from "react-icons/tb";
import HeaderBg from "@/assets/HeaderBgImage.svg";
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
  const [isLarge] = useMediaQuery("(min-width: 500px)");
  const health = 3;
  const isConnected = true;

  return (
    <HStack
      h={isLarge ? "120px" : "90px"}
      w="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt="-10px"
      px={isLarge ? "16px" : "0"}
    >
      <Box position="absolute" zIndex="base" width="100%" height="100%">
        <Image
          src={HeaderBg}
          alt="navbar background illustration."
          layout="responsive"
        />
      </Box>

      <HStack
        zIndex="docked"
        w="full"
        justifyContent="space-between"
        px="12px"
        pt="4px"
      >
        <VStack>
          <HStack gap="2px">
            <TbHeart size={24} />

            <Badge size="sm" variant="glass">
              {"x "}
              {health}
            </Badge>
          </HStack>
          <Text color="gray.40" fontSize="sm" fontWeight="bold">
            Health
          </Text>
        </VStack>

        <VStack>
          <Image src={Logo} alt="wits" />
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
