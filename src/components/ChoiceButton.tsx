import { CHOICE_BUTTON_STATE } from "@/types";
import { Box, Button, keyframes, Text } from "@chakra-ui/react";
import React, { ReactNode, useMemo, useState } from "react";

// greenOutlined: {
//   backgroundColor: "rgb(93,210,122, 0.2)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "green.400",
// },
// redOutlined: {
//   backgroundColor: "rgb(255, 98, 89, 0.2)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "red.400",
// },
// glassBackground: {
//   bg: "var(--chakra-colors-glassBackground)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "gray.400",
// },
// glassBackgroundDisabled: {
//   bg: "var(--chakra-colors-glassBackground)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "gray.400",
//   opacity: '0.50'
// },
// gray20: {
//   backgroundColor: "rgba(256, 256, 256, 0.2)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "gray.0",
// },
// gray40: {
//   backgroundColor: "rgba(256, 256, 256, 0.4)",
//   color: "gray.0",
//   borderStyle: "solid",
//   borderTopWidth: "1px",
//   borderRightWidth: "1px",
//   borderLeftWidth: "1px",
//   borderBottomWidth: "2px",
//   borderColor: "gray.0",
// },

interface ChoiceButtonProps {
  state: CHOICE_BUTTON_STATE;
  percentage?: number;
  btnText: string;
  handleClick: () => void;
}

export const ChoiceButton = ({
  state,
  btnText,
  percentage,
  handleClick,
}: ChoiceButtonProps) => {
  const [btnState] = useState(state);

  const changeColor = keyframes`
  0% { background-color: rgba(256, 256, 256, 0.2); }
  50% { background-color: rgba(256, 256, 256, 0.4); }
  100% { background-color: rgba(256, 256, 256, 0.2); }
`;

  const buttonStyles: {
    [key in CHOICE_BUTTON_STATE]: {
      variant: string;
      animation?: string;
      extraContent?: (percent: number) => ReactNode;
    };
  } = useMemo(
    () => ({
      [CHOICE_BUTTON_STATE.deafult]: {
        variant: "glassBackground",
      },
      [CHOICE_BUTTON_STATE.disabled]: {
        variant: "glassBackgroundDisabled",
      },
      [CHOICE_BUTTON_STATE.selected]: {
        variant: "gray20",
      },
      [CHOICE_BUTTON_STATE.blink]: {
        variant: "gray20",
        animation: `${changeColor} 0.5s infinite`,
      },
      [CHOICE_BUTTON_STATE.correct]: {
        variant: "greenOutlined",
      },
      [CHOICE_BUTTON_STATE.wrong]: {
        variant: "redOutlined",
      },
      [CHOICE_BUTTON_STATE.percentage]: {
        variant: "glassBackground",
        extraContent: (percentage) => {
          return (
            <>
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
            </>
          );
        },
      },
      [CHOICE_BUTTON_STATE.selectedPercentage]: {
        variant: "gray20",
        extraContent: (percentage) => {
          return (
            <>
              <Box
                position="absolute"
                left="0"
                borderLeftRadius="8px"
                borderRightRadius={percentage === 100 ? "8px" : "0"}
                zIndex={-1}
                h="full"
                w={`${percentage}%`}
                bg="rgba(256, 256, 256, 0.2)"
              />
              <Text size="md" color="gray.0" position="absolute" right="12px">
                {percentage}%
              </Text>
            </>
          );
        },
      },
    }),
    []
  );

  return (
    <Button
      {...buttonStyles[btnState]}
      color="gray.0"
      size="md"
      height="54px"
      width="full"
      _hover={{}}
      onClick={handleClick}
    >
      {btnText}
      {buttonStyles[btnState]?.extraContent &&
        buttonStyles[btnState]?.extraContent(percentage)}
    </Button>
  );
};
