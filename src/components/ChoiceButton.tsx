import { CHOICE_BUTTON_STATE } from "@/types";
import { Box, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
  const changeColor = {
    backgroundColor: [
      "rgba(256, 256, 256, 0.2)",
      "rgba(256, 256, 256, 0.4)",
      "rgba(256, 256, 256, 0.2)",
    ],
  };

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
      isDisabled={false}
      as={motion.button}
      animate={
        state === CHOICE_BUTTON_STATE.freeze && isPressed
          ? { ...changeColor, transition: { duration: 0.5, repeat: Infinity } }
          : {}
      }
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
