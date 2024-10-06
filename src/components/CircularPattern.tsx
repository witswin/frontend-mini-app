import { Box, BoxProps } from "@chakra-ui/react";

const CircleShadow = ({ ...props }: BoxProps) => (
  <>
    <Box
      zIndex={-1}
      position="fixed"
      boxShadow={`0 0 ${70}px ${70}px #63C6E1`}
      rounded="full"
      opacity="0.3"
      width="0px"
      height="0px"
      backdropFilter="blur(200px)"
      {...props}
    />
  </>
);
export const CircularPattern = () => {
  return (
    <Box>
      <CircleShadow bottom="0" right="calc(50vw - 206px)" />
      <CircleShadow top="60vh" right="calc(50vw + 206px)" />
      <CircleShadow top="40vh" right="calc(50vw - 103px)" />
      {/* <CircleShadow top="120px" right="calc(50vw + 103px)" /> */}
    </Box>
  );
};
