import { CountDown } from "@/components/CountDown";
import { motion } from "framer-motion";

export const QuizEnrolled = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}
      style={{ width: "100%" }}
    >
      <CountDown
        date={new Date().getTime() + 1000000}
        dateTimeStyle={{
          maxWidth: "74px",
        }}
        timerStyle={{
            flex:1
        }}
      />
    </motion.div>
  );
};
