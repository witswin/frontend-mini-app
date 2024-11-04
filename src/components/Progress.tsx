import { BoxProps, Stack, VStack } from "@chakra-ui/react";

interface ProgressProps {
  value: number;
  filledTrack?: BoxProps;
  track?: BoxProps;
}
export const Progress = ({ value, filledTrack, track }: ProgressProps) => {
  return (
    <VStack
      position="relative"
      width="full"
      display="inline-block"
      p="2px"
      borderRadius="10px"
      overflow="hidden"
      alignItems="stretch"
      {...track}
    >
      <Stack
        height="10px"
        borderRadius="10px"
        p="2px"
        width="full"
        bg="gray.900"
      >
        <Stack
          transition="width 1s ease"
          borderRadius="10px"
          width={`${value}%`}
          height="full"
          {...filledTrack}
        />
      </Stack>
    </VStack>
  );
};
