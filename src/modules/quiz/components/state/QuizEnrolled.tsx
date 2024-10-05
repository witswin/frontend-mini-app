import { motion } from "framer-motion";
import { useSelectedQuiz } from "../../hooks";
import dynamic from "next/dynamic";

const CountDown = dynamic(
  () => import("@/components/CountDown").then((modules) => modules.CountDown),
  { ssr: false }
);
export const QuizEnrolled = () => {
  const selectedQuiz = useSelectedQuiz();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}
      style={{ width: "100%" }}
    >
      <CountDown
        date={new Date(selectedQuiz?.startAt).getTime()}
        dateTimeStyle={{
          maxWidth: "74px",
        }}
        timerStyle={{
          flex: 1,
        }}
      />
    </motion.div>
  );
};
