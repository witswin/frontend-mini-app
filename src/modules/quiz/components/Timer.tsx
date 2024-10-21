import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const Timer = ({ count }: { count: number }) => {
  return (
    <VStack w="full" h="full" justifyContent="center" alignItems="center">
      <motion.div
        style={{
          width: "2000px",
          height: "2000px",
          position: "absolute",
          background:
            "conic-gradient(from -135deg at 50% 50%, var(--chakra-colors-blue), transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      />
      <Box
        boxSize="136px"
        borderRadius="50%"
        p="9px"
        border="1px solid var(--chakra-colors-gray-0)"
        bg="glassBackground"
        backdropFilter="blur(32px)"
      >
        <VStack
          boxSize="118px"
          borderRadius="50%"
          border="1px solid var(--chakra-colors-gray-0)"
          justifyContent="center"
          bg="glassBackground"
          boxShadow="0px 0px 32px 1px var(--chakra-colors-blue)"
          position="relative"
        >
          <AnimatePresence>
            <motion.p
              key={count}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: -50, opacity: 0 }}
              style={{
                width: "78px",
                height: "72px",
                textAlign: "center",
                position: "absolute",
                top: "23px",
                left: "20px",
                right: "0",
                color: "var(--chakra-colors-gray-0)",
                fontSize: 48,
                fontWeight: "700",
              }}
              transition={{ duration: 1 }}
            >
              {!!count && count > 0 ? count.toString() : "Go"}
            </motion.p>
          </AnimatePresence>
        </VStack>
      </Box>
    </VStack>
  );
};
