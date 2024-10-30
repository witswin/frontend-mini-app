import { BottomModal } from "@/components/BottomModal";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import itIsWhatItIs from "@/assets/it-is-what-it-is.svg";
import Link from "next/link";

export const GameOverModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const loosersCount = 21;
  return (
    <BottomModal
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      haveHeader={false}
    >
      <VStack w="full" h="full" gap="24px" pt="24px">
        <Image src={itIsWhatItIs} alt="sad-character" />

        <VStack gap="8px">
          <Text fontSize="2xl" color="red.400" fontWeight={800}>
            Ohh! Game Over.
          </Text>
          <Text fontSize="sm" color="gray.20" fontWeight={500}>
            {"you're not alone!"}
          </Text>
          <HStack gap="4px">
            <Text
              fontSize="sm"
              color="gray.0"
              fontWeight={500}
              textDecoration="underline"
            >
              {loosersCount}
            </Text>
            <Text fontSize="sm" color="gray.60" fontWeight={500}>
              people lost last round.
            </Text>
          </HStack>
        </VStack>

        <VStack gap="8px" w="full">
          <Button variant="outline" size="lg" w="full">
            Continue Watching
          </Button>
          <Button variant="ghost" as={Link} href="/">
            Back to home
          </Button>
        </VStack>
      </VStack>
    </BottomModal>
  );
};
