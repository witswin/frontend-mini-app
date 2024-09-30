import { EnrolledModalProvider } from "@/modules/quiz/context";
import { QuizPLP } from "@/modules/quiz/page";

const Index = () => {
  return (
    <EnrolledModalProvider>
      <QuizPLP />
    </EnrolledModalProvider>
  );
};

export default Index;
