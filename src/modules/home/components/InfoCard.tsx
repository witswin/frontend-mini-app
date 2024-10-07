import { ColorFullText } from "@/components/ColorFullText";
import { baseTheme } from "@/theme";
import { INFO_CARD_STATE } from "@/types";
import { Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { memo, useMemo, useState } from "react";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

const InfoCard = ({ state }: { state: INFO_CARD_STATE }) => {
  const [cardState] = useState(state);

  const selectedCard: {
    [key in INFO_CARD_STATE]: {
      largeTitle: string;
      subHeadline: string;
      btnObject?: {
        btnText: string;
        btnIcon?: React.ReactNode;
        href: string;
      };
    };
  } = useMemo(
    () => ({
      [INFO_CARD_STATE.welcome]: {
        largeTitle: "Welcome to Wits!",
        subHeadline: "Ready to challenge your brain\n and earn rewards?",
        btnObject: {
          btnText: "Get Started",
          btnIcon: <TbArrowBadgeRightFilled size={24} color="gray.0" />,
          href: "/quiz",
        },
      },
      [INFO_CARD_STATE.join]: {
        largeTitle: "Quiz time!",
        subHeadline: "Game begins in 8 sec... Ready yourself!",
      },
      [INFO_CARD_STATE.lobby]: {
        largeTitle: "Ready to Win?",
        subHeadline: "Ready to show what you know?",
      },
      [INFO_CARD_STATE.resource]: {
        largeTitle: "You're in the game",
        subHeadline: "Study up and get ready to win!",
      },
      [INFO_CARD_STATE.watch]: {
        largeTitle: "You're Late!",
        subHeadline: "But don’t worry,\nenjoy watching and learning!",
      },
    }),
    []
  );

  return (
    <VStack
      width="full"
      height="full"
      bg="glassBackground"
      borderRadius="16px"
      gap="32px"
      justifyContent="center"
      p="16px"
      flex={1}
    >
      <VStack maxW="90%" gap="0">
        <ColorFullText
          fontSize="6xl"
          textContent={selectedCard[cardState].largeTitle}
        />

        <Text
          whiteSpace={"pre-line"}
          maxW="100%"
          color="gray.10"
          fontSize="lg"
          fontWeight="700"
          lineHeight="34px"
          textAlign="center"
        >
          {selectedCard[cardState].subHeadline}
        </Text>
      </VStack>

      {selectedCard[cardState].btnObject && (
        <Button
          bgGradient={baseTheme.colors.glassBackground}
          variant="outline"
          gap="8px"
          as={Link}
          href={selectedCard[cardState].btnObject?.href}
        >
          {selectedCard[cardState].btnObject?.btnText}
          {selectedCard[cardState].btnObject?.btnIcon}
        </Button>
      )}
    </VStack>
  );
};

const MemoizedInfoCard = memo(InfoCard);
export { MemoizedInfoCard as InfoCard };
