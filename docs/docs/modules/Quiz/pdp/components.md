# Components

Quiz PDP components

### QuizInfo Component

The `QuizInfo` component displays detailed information about a selected quiz, including participant count, countdown timer, and enrollment status. It uses various hooks and components to fetch and display this information.

this component is used in the `QuizPDP` page and it has several states. we get the states from the `useGetCardState` hook. this component also has a modal to share the link of the quiz.

### ShareModal Component
in this component we generate the share link of the quiz and user can copy the link and share it with `Navigator.share` api.