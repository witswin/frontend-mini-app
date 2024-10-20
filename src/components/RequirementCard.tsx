import { Badge, Button, HStack, StackProps, Text } from "@chakra-ui/react";

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
          {/* TODO search about icon */}
          {/* <Check /> */}
        </Badge>
      ) : (
        <Button onClick={onClick} size="mini" variant="outline">
          Check
        </Button>
      )}
    </HStack>
  );
};
