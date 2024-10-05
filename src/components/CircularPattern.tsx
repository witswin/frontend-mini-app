import { Box, BoxProps } from "@chakra-ui/react";

const CircleShadow = ({ ...props }: BoxProps) => (
  <>
    <Box
      zIndex={-1}
      position="fixed"
      boxShadow={`0 0 ${90}px ${90}px #63C6E1`}
      rounded="full"
      opacity="0.3"
      width="0px"
      height="0px"
      backdropFilter='blur(200px)'
      {...props}
    />
    <Box
      zIndex={-1}
      position="absolute"
      boxShadow={`0 0 ${90}px ${90}px ##9227FF`}
      rounded="full"
      opacity="0.3"
      width="0px"
      height="0px"
      backdropFilter='blur(200px)'
      {...props}
    />
  </>
);
export const CircularPattern = () => {
  return (
    <Box top='0' left='0' position='fixed' width="full" height="full" backdropFilter="blur(200px)">
      <CircleShadow bottom="0" right='calc(50vw - 206px)' />
      <CircleShadow top="60vh" right='calc(50vw + 206px)' />
      <CircleShadow top="40vh" right='calc(50vw - 103px)' />
      {/* <CircleShadow top="120px" right='calc(50vw + 103px)' /> */}
    </Box>
  );
};
