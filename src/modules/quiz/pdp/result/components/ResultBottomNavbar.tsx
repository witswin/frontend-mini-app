import { Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Cup, HomeAngle2, XXX } from "solar-icon-set";

export const ResultBottomNavbar = () => {
  return (
    <HStack w="full" h="45px" gap="16px" position="relative" pl='1px' bottom="0">
      <Link href="/">
        <Button size="sm">
          <HomeAngle2
            color="var(--chakra-colors-gray-0)"
            iconStyle="Bold"
            size={20}
          />
        </Button>
      </Link>

      <HStack w="full" gap="16px" paddingX="1px">
        <Button w="full" variant="outline" size="sm" gap="6px">
          <Cup
            color="var(--chakra-colors-gray-20)"
            iconStyle="Bold"
            size={20}
          />
          <Text color="gray.20" fontSize="md" fontWeight={500}>
            Leader Board
          </Text>
        </Button>

        <Button w="full" variant="outline" size="sm" gap="6px">
          <Text color="gray.20" fontSize="md" fontWeight={500}>
            Share on
          </Text>
          <XXX
            color="var(--chakra-colors-gray-20)"
            iconStyle="Bold"
            size={20}
          />
        </Button>
      </HStack>
    </HStack>
  );
};
