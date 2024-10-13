import { QuizPrize } from "@/components/QuizCard";
import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import { STATUS_ENROLL_VALUE } from "../../types";
import { HintUnit, HourGlass, Question } from "@/components/Icons";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelectedQuiz } from "../../hooks";

interface ValueCardProps {
  title: string | number;
  subTitle: string;
  status: STATUS_ENROLL_VALUE;
}
const ValueCard = ({ subTitle, title, status }: ValueCardProps) => {
  const statusComponents = useMemo(() => {
    return {
      [STATUS_ENROLL_VALUE.QUESTION]: {
        icon: <Question />,
        title: (
          <Text fontSize="lg" color="gray.0" fontWeight="700">
            {title}
          </Text>
        ),
      },
      [STATUS_ENROLL_VALUE.TIME]: {
        icon: <HourGlass />,
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
      py="8px"
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
      {statusComponents[status].icon}
    </VStack>
  );
};

export const QuizInfo = () => {
  const selectedQuiz = useSelectedQuiz();

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
        <ValueCard
          status={STATUS_ENROLL_VALUE.HINT}
          subTitle={`${selectedQuiz?.hintCount} Hint`}
          title={selectedQuiz?.hintCount}
        />
      </Flex>
    </motion.div>
  );
};
