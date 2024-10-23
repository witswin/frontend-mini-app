import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Timer = ({ count }: { count: number }) => {
  const [state, setSate] = useState(count);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state > 0) {
        setSate((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <VStack w="full" h="full" justifyContent="center" alignItems="center">
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: `conic-gradient(from -360deg, #6E81EE 0deg, rgba(110, 129, 238, 0) 360deg)`,
        }}
        animate={{
          background: `conic-gradient(from ${
            -(360 * state) / count
          }deg, #6E81EE 0deg, rgba(110, 129, 238, 0) 360deg)`,
        }}
        transition={{
          duration: 1,
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
              {state > 0 ? state.toString() : "Go"}
            </motion.p>
          </AnimatePresence>
        </VStack>
      </Box>
    </VStack>
  );
};
