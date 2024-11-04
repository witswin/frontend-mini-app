import { Box, BoxProps } from "@chakra-ui/react";

export const CircleShadow = ({ ...props }: BoxProps) => (
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
      <Box
        zIndex={0}
        bottom="0"
        right="calc(50vw - 206px)"
        width="50px"
        height="50px"
        position="absolute"
        filter="blur(80px)"
        background="radial-gradient(101.43% 155% at 49.76% -9%, #9553F6 0%, #6E81EE 29.98%, #63C6E1 100%)"
      />
      <Box
        zIndex={0}
        top="60vh"
        right="calc(50vw + 206px)"
        width="50px"
        height="50px"
        position="absolute"
        filter="blur(80px)"
        background="radial-gradient(101.43% 155% at 49.76% -9%, #9553F6 0%, #6E81EE 29.98%, #63C6E1 100%)"
      />
      <Box
        zIndex={0}
        top="40vh"
        right="calc(50vw - 103px)"
        width="50px"
        height="50px"
        position="absolute"
        filter="blur(80px)"
        background="radial-gradient(101.43% 155% at 49.76% -9%, #9553F6 0%, #6E81EE 29.98%, #63C6E1 100%)"
      />
      <Box
        zIndex={0}
        top="120px"
        right="calc(50vw + 103px)"
        width="50px"
        height="50px"
        position="absolute"
        filter="blur(80px)"
        background="radial-gradient(101.43% 155% at 49.76% -9%, #9553F6 0%, #6E81EE 29.98%, #63C6E1 100%)"
      />
      {/* <CircleShadow bottom="0" right="calc(50vw - 206px)" />
      <CircleShadow top="60vh" right="calc(50vw + 206px)" />
      <CircleShadow top="40vh" right="calc(50vw - 103px)" /> */}
      {/* <CircleShadow top="120px" right="calc(50vw + 103px)" /> */}
    </Box>
  );
};
