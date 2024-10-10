import { Box, Button, Text } from "@chakra-ui/react";

interface PercentageButtonProps {
  percentage: number;
  btnText: string;
  handleClick: () => void;
}

export const PercentageButton: React.FC<PercentageButtonProps> = ({
  percentage,
  btnText,
  handleClick,
}: PercentageButtonProps) => {
  return (
    <Button
      height="54px"
      variant="glassBackground"
      w="full"
      position="relative"
      onClick={handleClick}
    >
      {btnText}
      <Box
        position="absolute"
        left="0"
        borderLeftRadius="8px"
        borderRightRadius={percentage === 100 ? "8px" : "0"}
        zIndex={-1}
        h="full"
        w={`${percentage}%`}
        bg="rgba(110, 129, 238, 0.36)"
      />
      <Text size="md" color="blue" position="absolute" right="12px">
        {percentage}%
      </Text>
    </Button>
  );
};
