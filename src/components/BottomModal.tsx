import {
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps extends UseDisclosureProps {
  title?: string;
  haveHeader?: boolean;
}

export const BottomModal = ({
  children,
  onClose,
  title,
  isOpen,
  haveHeader = true,
}: ModalProps & BoxProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />

      <DrawerContent
        width="538px"
        mx="auto"
        borderStartStartRadius="24px"
        borderStartEndRadius="24px"
        borderTop="2px solid"
        borderColor="cyan"
        background="var(--chakra-colors-cardBackground)"
        backdropFilter="blur(50px)"
        boxShadow="0 5px 0px rgb(32,32,51), 1px 0px 0px rgb(32,32,51), -1px 0px 0px rgb(32,32,51)"
        p="16px"
        gap="16px"
      >
        {haveHeader && (
          <>
            <DrawerCloseButton color="gray.100" />
            <HStack width="full">
              <Text
                fontFamily="kanit"
                fontSize="2xl"
                fontWeight="600"
                textAlign="center"
                width="full"
                color="gray.0"
                lineHeight="28px"
                maxWidth="199px"
                mx="auto"
              >
                {title}
              </Text>
            </HStack>
          </>
        )}

        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
