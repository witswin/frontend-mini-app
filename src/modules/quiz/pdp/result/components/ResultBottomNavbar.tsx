import { Button, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Cup, HomeAngle2 } from "solar-icon-set";

export const ResultBottomNavbar = () => {
  return (
    <HStack
      px="16px"
      w="full"
      h="45px"
      gap="16px"
      position="fixed"
      bottom="8px"
      left="0"
    >
      <Button variant="solid" size="sm" as={Link} href="/">
        <HomeAngle2
          color="var(--chakra-colors-gray-0)"
          iconStyle="Bold"
          size={20}
        />
      </Button>

      <HStack w="full" gap="16px" paddingX="1px">
        <Button w="full" variant="outline" size="sm" gap="6px" color="gray.20">
          <Cup
            color="var(--chakra-colors-gray-20)"
            iconStyle="Bold"
            size={20}
          />
          Leader Board
        </Button>

        <Button w="full" variant="outline" size="sm" gap="6px" color="gray.20">
          Share on
          <Image
            src="/assets/images/result/brand-x.svg"
            alt="X logo"
            width={20}
            height={20}
          />
        </Button>
      </HStack>
    </HStack>
  );
};
