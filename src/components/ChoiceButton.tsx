import { CHOICE_BUTTON_STATE } from "@/types";
import { Box, Button, ButtonProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";

interface ChoiceButtonProps extends ButtonProps {
  state: CHOICE_BUTTON_STATE;
  percentage?: number;
  buttonInfo: {
    content: string;
  };
}

export const ChoiceButton = ({
  state,
  buttonInfo,
  percentage,
  ...buttonProps
}: ChoiceButtonProps) => {
  const [isSelected, setSelected] = useState(true);

  const handleClick = () => {
    if (state === CHOICE_BUTTON_STATE.default) setSelected(true);
  };

  const variant = useMemo(
    () => ({
      [CHOICE_BUTTON_STATE.default]: isSelected ? "pressed" : "default",
      [CHOICE_BUTTON_STATE.freeze]: isSelected ? "pressed" : "default",

      [CHOICE_BUTTON_STATE.rightAnswer]: "rightAnswer",

      [CHOICE_BUTTON_STATE.wrongAnswer]: "wrongAnswer",
    }),
    [isSelected]
  );

  return (
    <Button
      variant={variant[state]}
      color="gray.0"
      size="md"
      height="54px"
      width="full"
      onClick={handleClick}
      isDisabled={false}
      as={motion.button}
      {...(state === CHOICE_BUTTON_STATE.default &&
        isSelected && {
          animate: {
            backgroundColor: [
              "rgba(256, 256, 256, 0.2)",
              "rgba(256, 256, 256, 0.4)",
              "rgba(256, 256, 256, 0.2)",
            ],
            boxShadow: "0px 1px 0px 0px #FFFFFF, 0px 0px 0px 0px #FFFFFF66",
            transition: { duration: 0.2, repeat: Infinity, delay: 0.1 },
          },
        })}
      {...buttonProps}
    >
      {buttonInfo.content}

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
          <Text fontSize="md" color="gray.0" position="absolute" right="12px">
            {percentage}%
          </Text>
        </>
      )}
    </Button>
  );
};
