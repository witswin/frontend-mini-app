import {
  Badge,
  Box,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import HeaderBg from "@/assets/HeaderBgImage.svg";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { WalletMoney } from "solar-icon-set";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useAuth } from "@/hooks/useAuthorization";

const WalletStatus = ({ signedIn }: { signedIn: boolean }) => {
  return (
    <Badge
      variant={signedIn ? "green" : "red"}
      size="xs"
      position="absolute"
      left="0"
      bottom="0"
    />
  );
};

export const TopNavbar = () => {
  const [isLarge] = useMediaQuery("(min-width: 500px)");
  const authInfo = useAuth();

  const { connect, connectors } = useWalletConnection();

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
        pt={isLarge ? "20px" : "4px"}
      >
        <VStack w="82px">
          <HStack gap="2px">
            {/* <Neuron size={24} /> */}

            {/* <Badge size="sm" variant="glass">
              {"x "}
              {health}
            </Badge> */}
            <Image
              src="/assets/images/home/Neuron.svg"
              alt="neuron"
              width={22}
              height={23}
            />
          </HStack>
          <Text color="gray.40" fontSize="sm" fontWeight="bold">
            {`${authInfo?.neurons} Neuorans`}
          </Text>
        </VStack>

        <VStack>
          <Image src={Logo} alt="wits" />
        </VStack>

        <VStack w="82px" pl="12px">
          <Box
            cursor="pointer"
            onClick={() =>
              connect({
                connector: connectors.find(
                  (connector) => connector.id === "injected"
                )!,
              })
            }
            position="relative"
          >
            <WalletMoney
              iconStyle="BoldDuotone"
              color="var(--chakra-colors-blue)"
              size={24}
            />
            <WalletStatus signedIn={!!authInfo} />
          </Box>
          <Text color="gray.40" fontSize="sm" fontWeight="bold">
            Wallet
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};
