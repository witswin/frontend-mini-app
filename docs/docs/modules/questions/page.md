# Page

the page file is the main file that contains the main logic of the question.
in this file we configure the `WS`.

```jsx
useEffect(() => {
  console.log('Quiz Start', new Date(quiz?.startAt).getTime() / 1000);

  if (!socket.current.client) return;
  const handleMessage = (e: MessageEvent) => {
    if (e.data !== 'PONG') {
      const data = JSON.parse(e.data);

      if (data.type === 'new_question') {
        const secondsRemaining = calculatePreTimer(
          new Date(quiz.startAt),
          quiz.questionTimeSeconds,
          quiz.restTimeSeconds,
          data.question.number,
        );
        console.log('New Question', new Date().getTime() / 1000);

        if (data.question.expire)
          setCounter(
            Math.round(data.question.expire - new Date().getTime() / 1000),
          );
        else {
          setCounter(secondsRemaining);
        }

        dispatch((prev) => {
          if (prev?.question?.id === data?.question) return prev;

          if (quiz.shuffleAnswers) {
            data.question.choices = shuffleArray(data.question.choices);
          }

          return {
            ...prev,
            question: {
              ...data.question,
              state: QUESTION_STATE.default,
              correct: null,
            },
          };
        });

        const correctAnswer = data?.question?.choices?.find(
          (item: choice) => item.isCorrect,
        );

        if (correctAnswer) {
          dispatch((prev) => ({
            ...prev,
            question: { ...prev.question, correct: correctAnswer.id },
          }));
        }
      } else if (data.type === 'correct_answer') {
        const answerData = data.data;

        dispatch((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            correct: answerData,
          },
        }));
      } else if (data.type === 'quiz_stats') {
        const stats = data.data;

        dispatch((prev) => ({
          ...prev,
          quizStats: stats,
        }));
      }
    }
  };
  socket.current.client.addEventListener('message', handleMessage);

  return () => {
    socket.current.client?.removeEventListener('message', handleMessage);
  };
}, [socket?.current?.client]);
```

`new_question` is when the server gives us a new question. we calculate the time remaining for the question and set the counter to the remaining time and set the default state for the question. shuffleAnswers is a boolean that we get from the server to shuffle the answers or not. if we receive `correct_answer` we set the correct answer for the question. if we receive `quiz_stats` we set the stats of the quiz.

the content of this page has several states

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    if (
      new Date(quiz.startAt).getTime() - new Date().getTime() >= 6000 &&
      pageState !== CARD_STATE.lobby
    ) {
      setPageState(CARD_STATE.lobby);
    }
    if (new Date(quiz.startAt).getTime() - new Date().getTime() < 6000) {
      setPageState(CARD_STATE.join);
      setQuizContentMode('timer');
    }
    if (new Date(quiz.startAt).getTime() - new Date().getTime() <= -2) {
      setQuizContentMode('quiz');
    }
  }, 300);
  return () => clearInterval(interval);
}, []);
```

if the quiz start time more that 6 seconds we show the lobby page. if the quiz start time less than 6 seconds we show the join state and timer component. else we show the question content. `quizContentMode` is one of the `timer` or `quiz`. `pageState` is one of the `lobby` or `join`. `lobby` when the quiz is not started yet and `join` when the quiz is started and the user should join the quiz.