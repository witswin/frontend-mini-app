import { Badge, Button, HStack, StackProps, Text } from "@chakra-ui/react";
import { TbCheck } from "react-icons/tb";

interface RequirementCardProps extends StackProps {
  title: string;
  isDone: boolean;
  onClick: () => void;
}
export const RequirementCard = ({
  isDone,
  title,
  onClick,
}: RequirementCardProps) => {
  return (
    <HStack
      p="12px"
      borderRadius="8px"
      bg="glassBackground"
      justifyContent="space-between"
      width="full"
    >
      <Text fontSize="md" fontWeight="600" color="gray.20">
        {title}
      </Text>
      {isDone ? (
        <Badge
          display="flex"
          alignItems="center"
          justifyContent="center"
          size="md"
          variant="primary"
        >
          <TbCheck />
        </Badge>
      ) : (
        <Button onClick={onClick} size="sm" variant="outline">
          Check
        </Button>
      )}
    </HStack>
  );
};
