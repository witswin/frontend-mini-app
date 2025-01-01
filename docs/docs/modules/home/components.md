# Components

Home module components

The main component is `InfoCard`:
This component is like QuizCard. it has several states that types are INFO_CARD_STATE.

- `welcome`: this state used when the user doesn't have any quiz.
- `join`: this state used when the user enrolled in a quiz and quiz will start less than 10 minutes.
- `lobby`: this state used when the user enrolled in a quiz and quiz will start more than 10 minutes.

- `resources`: this state used when the user enrolled in a quiz and quiz will start more than 10 minutes and the quiz has resources.

- `watch`: when the user doesn't enroll in a quiz or loss the quiz.
