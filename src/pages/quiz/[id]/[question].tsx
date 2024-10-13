import { QuestionDataProvider } from "@/modules/question/context";
import { Question } from "@/modules/question/page";

const Index = () => {
  return (
    <QuestionDataProvider timer={10}>
      <Question />
    </QuestionDataProvider>
  );
};

export default Index;
