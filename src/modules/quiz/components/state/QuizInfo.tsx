import { QuizPrize } from "@/components/QuizCard";
import { Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { STATUS_ENROLL_VALUE } from "../../types";
import { HintUnit } from "@/components/Icons";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSelectedQuiz } from "../../hooks";
import { TbBulbFilled } from "react-icons/tb";
import { HintCard } from "@/components/HintCards";
import { HINTS } from "@/types";

interface ValueCardProps {
  title: string | number;
  subTitle: string;
  status: STATUS_ENROLL_VALUE;
}
const ValueCard = ({ subTitle, title, status }: ValueCardProps) => {
  const statusComponents = useMemo(() => {
    return {
      [STATUS_ENROLL_VALUE.QUESTION]: {
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title}
          </Text>
        ),
      },
      [STATUS_ENROLL_VALUE.TIME]: {
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title}
          </Text>
        ),
      },
      [STATUS_ENROLL_VALUE.HINT]: {
        icon: <HintUnit />,
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title}
          </Text>
        ),
      },
    };
  }, []);

  return (
    <VStack
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.400"
      bg="glassBackground"
      flex={1}
      py="12px"
    >
      {statusComponents[status].title}
      <Text
        textAlign="center"
        width="full"
        fontSize="sm"
        fontWeight="600"
        color="gray.60"
      >
        {subTitle}
      </Text>
    </VStack>
  );
};

export const QuizInfo = () => {
  const selectedQuiz = useSelectedQuiz();
  const [userHint, setUserHint] = useState<HINTS[] | undefined[]>([
    HINTS.extraTime,
    HINTS.fiftyFifty,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        rowGap: "16px",
      }}
    >
      <Center
        py="12px"
        borderRadius="10px"
        bg="var(--chakra-colors-glassBackground)"
        width="full"
      >
        <QuizPrize
          prize={selectedQuiz?.prizeAmount}
          unitPrize={selectedQuiz?.token}
        />
      </Center>
      <Flex width="full" columnGap="12px">
        <ValueCard
          status={STATUS_ENROLL_VALUE.QUESTION}
          subTitle="Questions"
          title={selectedQuiz?.questions?.length}
        />
        <ValueCard
          status={STATUS_ENROLL_VALUE.TIME}
          subTitle="Each Question"
          title="10 sec"
        />
      </Flex>

      <VStack
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.400"
        bg="glassBackground"
        p="12px"
        width="full"
      >
        <HStack gap="4px" alignItems="start">
          <TbBulbFilled size={25} />
          <Text fontSize="3xl" fontWeight="700">
            Hints
          </Text>
        </HStack>
        <Flex width="full" columnGap="12px">
          <HintCard
            hintObject={{
              hint: userHint[0],
              hints: userHint,
              setHints: setUserHint,
            }}
          />
          <HintCard
            hintObject={{
              hint: userHint[1],
              hints: userHint,
              setHints: setUserHint,
            }}
          />
        </Flex>
      </VStack>
    </motion.div>
  );
};
