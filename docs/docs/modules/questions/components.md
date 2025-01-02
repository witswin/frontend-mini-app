# Components

Question module components

1. **GameOverModal**: This component is displayed when the user send a wrong answer. to show this component we should check some conditions:
   - selected choice id is not same as the correct answer id
   - this modal didn't show before
   - this quiz should be enrolled by the user. (to prevent showing this modal when the user didn't enroll in the quiz)
   - user for this question should be eligible to answer this question. (to prevent showing this modal when the user didn't enroll in the quiz or user has wrong answer before)
   - the question is not the last question in the quiz.
2. **Lobby**: This component is used when user enroll in the quiz and go to the `/match` route. this component shows the quiz information, hints, and the rules of the quiz.

3. **QuestionBanner**: It shows the banner of the question and its a question text.

4. **QuestionCard**: This component is the main component of the question. it shows the question text, choices, and the timer. it has two state. one is `rest` and other is default. The rest time comes from `restTimeSeconds` in the backend. we should calc this because the rest time is some of the freezed time, answered time (show the correct answer to user) and the extra time hint.
   in this component we check the extra time hint `isUsedExtraTimeHint` if it used in the question, we change the time of the `rest` state. also we check `WS` the 50/50 hint is used or not. if it used we disabled the two choices that are not correct.

5. **QuestionContent**: In this component we show the choices and selected hints. we also render the `GameOverModal` in this component. if user be an `Eligible`, user can send answers otherwise we show the `spectator` view. in the hint section, we check is the hint used or not. if it used we disabled the hint button.

6. **QuizTimerScreen**: This component is show the 5 seconds countdown before the quiz starts.

7. **Rest**: This component is render when the question time is end up. it has two state. user had a correct answer or had a wrong answer.

8. **TopNavbar**: This component render the questions top navbar. it shows the survivors and the question number. to get data we use `useQuestionData` hook.
