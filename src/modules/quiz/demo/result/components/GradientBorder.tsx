import { Box } from "@chakra-ui/react";
import React from "react";

export const GradientBorder = () => {
  return (
    <>
      <Box
        zIndex={-1}
        position="absolute"
        left="50%"
        top="50%"
        bg="primaryLinear"
        height="full"
        w="calc(100%)"
        h="calc(100%)"
        transform="translate(-50%,-50%)"
        borderRadius="md"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        borderRadius="md"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        zIndex={-1}
        bg="gray.900"
        transform="translate(-50%,-50%)"
      />
    </>
  );
};
