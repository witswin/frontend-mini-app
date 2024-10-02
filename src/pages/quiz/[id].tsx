import { QuizPDPGlobalProvider } from "@/modules/quiz/pdp/context";
import { Index } from "@/modules/quiz/pdp/page";
import { QUIZ_STATE, quizPDP } from "@/modules/quiz/pdp/types";

const QuizPDP = ({ data }: { data: quizPDP }) => {
  return (
    <QuizPDPGlobalProvider data={data}>
      <Index />
    </QuizPDPGlobalProvider>
  );
};

export default QuizPDP;

export const getServerSideProps = () => {
  return {
    props: {
      data: {
        isEnrolled: true,
        quizState: QUIZ_STATE.started,
        quizStartedDate: new Date().getTime() + 100000,
        heart: 2,
      },
    },
  };
};
