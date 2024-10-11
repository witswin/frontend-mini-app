import { CHOICE_BUTTON_STATE } from "@/types";
import { Box, Button, keyframes, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

interface ChoiceButtonProps {
  state: CHOICE_BUTTON_STATE;
  percentage?: number;
  btnText: string;
}

export const ChoiceButton = ({
  state,
  btnText,
  percentage,
}: ChoiceButtonProps) => {
  const changeColor = keyframes`
  0% { background-color: rgba(256, 256, 256, 0.2); }
  50% { background-color: rgba(256, 256, 256, 0.4); }
  100% { background-color: rgba(256, 256, 256, 0.2); }
`;

  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (state === CHOICE_BUTTON_STATE.default) setIsPressed(true);
  };

  const buttonStyles: {
    [key in CHOICE_BUTTON_STATE]: {
      variant: string;
      animation?: string;
    };
  } = useMemo(
    () => ({
      [CHOICE_BUTTON_STATE.default]: {
        variant: isPressed ? "pressed" : "default",
      },
      [CHOICE_BUTTON_STATE.freeze]: {
        variant: isPressed ? "pressed" : "default",
      },
      [CHOICE_BUTTON_STATE.rightAnswer]: {
        variant: "rightAnswer",
      },
      [CHOICE_BUTTON_STATE.wrongAnswer]: {
        variant: "wrongAnswer",
      },
    }),
    [isPressed]
  );

  return (
    <Button
      {...buttonStyles[state]}
      color="gray.0"
      size="md"
      height="54px"
      width="full"
      onClick={handleClick}
      animation={
        state === CHOICE_BUTTON_STATE.freeze && isPressed
          ? `${changeColor} 0.5s infinite`
          : ""
      }
      isDisabled={false}
    >
      {btnText}

      {!!percentage && state === CHOICE_BUTTON_STATE.default && (
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
      )}
    </Button>
  );
};
