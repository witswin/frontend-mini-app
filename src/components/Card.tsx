import { BoxProps, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  colored?: boolean;
}
export const Card = ({ colored, children, ...rest }: CardProps & BoxProps) => {
  return (
    <VStack
      width="full"
      position="relative"
      background="gray.700"
      borderRadius="16px"
      _before={{
        borderRadius: "16px",
        content: "''",
        position: "absolute",
        inset: "-2px",
        bottom: "-2px",
        background: colored ? "primaryRadial" : "gray.400",
        boxShadow: "0px 2px 0px 0px var(--chakra-colors-gray-400)",
        width: "calc(100% + 4px)",
        zIndex: -1,
        height: "calc(100% + 3px)",
      }}
      {...rest}
    >
      <VStack
        overflow="hidden"
        p="16px"
        rowGap="16px"
        width="full"
        background="gray.700"
        borderRadius="inherit"
        zIndex={2}
        height="full"
      >
        {children}
      </VStack>
    </VStack>
  );
};
