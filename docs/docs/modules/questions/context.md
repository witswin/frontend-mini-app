# Context

The core part of app is here. This module is responsible for managing the state of the questions, the user's answers, and the hints. It also manages the state of the game, such as the current question, the number of survivors, and the user's eligibility to answer the question.

## QuestionData

    this context is used for store the question data.

## QuestionDataDispatch

    this context is used for dispatch the question data.

## QuestionDataProvider

    this is provider of the whole question data. in this provider we have a state that includes `quiz` that is quiz data, `question` that is the question data, `quizStats` that is the stats of the quiz e.g. number of survivors. in this provider we used `useCounter` to get the time of quiz and select the suitable state for the question and `useCounterDispatch` to dispatch the counter.

```jsx
useEffect(() => {
  let interval: NodeJS.Timeout;
  if (state?.question && counter !== 0) {
    interval = setInterval(() => {
      counterDispatch((prev) => {
        if (prev - 1 > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
  }
  return () => clearInterval(interval);
}, [state?.question?.id]);
```

    in this part we reduce the counter by 1 every second.

```jsx
useEffect(() => {
  if (state?.question?.state === QUESTION_STATE.freeze) {
    const freezeTimeOut = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          state: QUESTION_STATE.answered,
        },
      }));
      return () => {
        clearTimeout(freezeTimeOut);
      };
    }, 2000);
  }
}, [state?.question?.state]);
```

in this part we check the state for answered state. if state is freezed, we wait for 2 seconds and then change the state to answered. we told in previous part that the rest time is sum of the freezed time, answered time (show the correct answer to user) and the extra time hint and self of rest that comes from backend.

```jsx
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (state?.question?.state === QUESTION_STATE.answered) {
      if (state.question.number !== state.quiz.questions.length) {
        timeout = setTimeout(() => {
          console.log("Rest state",new Date().getTime() / 1000);
          setState((prev) => ({
            ...prev,
            question: {
              ...prev.question,
              state: QUESTION_STATE.rest,
            },
          }))
        }, 1000)
      } else {
        timeout = setTimeout(() => {
          push(`/quiz/${query.id}/result`)
        }, 1000)
      }
    }

    return () => clearTimeout(timeout)
  }, [state?.quiz?.questions?.length, state?.question?.state])
```
in this part we check the the state to show the `rest` state. if the state is `answered` we wait for 1 second to show the correct answer to user and then change the state to `rest`. if the question is the last question in the quiz we redirect the user to the result page.

```jsx
  useEffect(() => {
    if (state?.question?.state !== QUESTION_STATE.answered) {
      if (
        counter === 0 &&
        state?.question?.state !== QUESTION_STATE.freeze &&
        state?.question?.state !== QUESTION_STATE.rest
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.freeze,
          },
        }))
      } else if (
        counter > 3 &&
        state?.question?.state !== QUESTION_STATE.default
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.default,
          },
        }))
      } else if (
        counter <= 3 &&
        counter > 0 &&
        state?.question?.state !== QUESTION_STATE.alert
      ) {
        setState((prev) => ({
          ...prev,
          question: {
            ...prev.question,
            state: QUESTION_STATE.alert,
          },
        }))
      }
    }
  }, [counter, state.question])
```

this part we check every second the counter and set the suitable state for the question. if the counter is 0 and the state is not freezed or rest we change the state to freezed. if the counter is more than 3 and the state is not default we change the state to default. if the counter is less than 3 and more than 0 and the state is not alert we change the state to alert.

## Hint 
this context store the selected hints and used hints.
## HintDispatch
dispatcher for hints

## HintProvider
in this provider we get the enrolled quiz by the route that user enter and add default registered hints to selected hints. 


## Counter
this context store the counter of the question.
## CounterDispatch
dispatcher for counter

## CounterProvider

this provider is for check the time of the question quiz startAt, e.g. if user comes a little after the quiz starts, we should show the real time of the question not the initial of the question time. we use the `calculatePreTimer` function to calculate this time.

```jsx
export const calculatePreTimer = (
  startAt: Date,
  questionTimeSeconds: number,
  restTimeSeconds: number,
  number?: number
) => {
  const timePassedSeconds = (new Date().getTime() - startAt.getTime()) / 1000

  const questionTimePeriod = questionTimeSeconds + restTimeSeconds

  if (!number) {
    return Math.min(
      questionTimeSeconds,
      +(
        questionTimeSeconds -
        ((timePassedSeconds % questionTimePeriod) - restTimeSeconds)
      ).toFixed(0)
    )
  }
  const questionStartTime =
    startAt.getTime() / 1000 + questionTimePeriod * (number - 1)
  return Math.min(
    questionTimeSeconds,
    Math.round(
      Math.abs(
        questionTimeSeconds - (questionStartTime - new Date().getTime() / 1000)
      )
    )
  )
}
```

the time passed is the now minus the start time of the quiz. question time period is the sum of the question time and rest time. the number is the number of the question. if the number is not exist we calculate the time of the question by the time passed and the rest time. if the number is exist we calculate the time of the question by the time passed and the rest time and the number of the question.

