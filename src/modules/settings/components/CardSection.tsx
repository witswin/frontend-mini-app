import { BoxProps, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const CardSection: FC<PropsWithChildren & BoxProps> = ({
  children,
  ...rest
}) => {
  return (
    <VStack
      width="full"
      background="glassBackground"
      borderRadius="16px"
      p="16px"
      gap="24px"
      {...rest}
    >
      <VStack
        overflow="hidden"
        p="10px"
        rowGap="16px"
        width="full"
        borderRadius="inherit"
        zIndex={2}
        height="full"
      >
        {children}
      </VStack>
    </VStack>
  );
};
