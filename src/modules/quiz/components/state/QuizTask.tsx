import { RequirementCard } from "@/components/RequirementCard";
import { motion } from "framer-motion";

export const QuizTask = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}
      style={{
        width: "100%",
        rowGap: "16px",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <RequirementCard
        onClick={() => {}}
        title="Aura Authentication"
        isDone={true}
      />
      <RequirementCard
        onClick={() => {}}
        title="Connected Metamask"
        isDone={true}
      />
      <RequirementCard
        onClick={() => {}}
        title="Requirement Name"
        isDone={true}
      />
    </motion.div>
  );
};
