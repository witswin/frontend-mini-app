import { Box, Card, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { TbX } from "react-icons/tb";
import { ClockPlus, FiftyFifty, Plus, UsersGroup } from "./Icons";

interface LargeCardProps {
  headline?: string;
  subHeadline?: string;
  icon: (props?: {
    isDisabled?: boolean;
    width?: number;
    height?: number;
  }) => JSX.Element;
}

const LargeCard = ({ headline, subHeadline, icon }: LargeCardProps) => {
  const haveChildren = !!headline;
  return (
    <Card
      bg="rgba(110, 129, 238, 0.08)"
      p="8px"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      gap="8px"
      h="102px"
      w="172px"
    >
      {haveChildren ? (
        <>
          <Box
            position="absolute"
            top="9px"
            right="9px"
            color="gray.60"
            onClick={() => {}}
            cursor="pointer"
          >
            <TbX color="gray.60" />
          </Box>

          {icon()}

          <VStack gap="2px" w="full">
            <Text fontSize="lg" color="gray.0">
              {headline}
            </Text>
            <Text fontSize="sm" color="gray.60">
              {subHeadline}
            </Text>
          </VStack>
        </>
      ) : (
        icon()
      )}
    </Card>
  );
};

// export const;

export const AddHint = () => {
  return (
    <Box cursor="pointer" onClick={() => {}}>
      <LargeCard icon={Plus} />
    </Box>
  );
};
export const FiftyFiftyHint = () => {
  return (
    <LargeCard
      headline="50/50"
      subHeadline="Remove 2 Answers"
      icon={FiftyFifty}
    />
  );
};

export const Stats = () => {
  return (
    <LargeCard
      headline="Audience Poll"
      subHeadline="See Others Answers"
      icon={UsersGroup}
    />
  );
};

export const ExtraTime = () => {
  return (
    <LargeCard
      headline="Extra Time"
      subHeadline="3 More Seconds"
      icon={ClockPlus}
    />
  );
};
