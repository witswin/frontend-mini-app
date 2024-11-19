import { Box } from "@chakra-ui/react";
import React from "react";

export const BoxShadow = () => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(110, 129, 238, 0.2)"
      borderRadius="md"
      opacity={0.7}
      pointerEvents="none"
    />
  );
};
