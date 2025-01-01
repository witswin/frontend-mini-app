# Page

render the main page of the quiz module.
in this component we have a `QuizList` component that shows the list of the quiz.
our goal is to insert the active quiz in the middle of the list.

### Centered Quizzes and Default Active Index

This section of the code processes quiz data to create a centered list of quizzes and determines the default active index.

#### centeredQuizzes

The `centeredQuizzes` constant is memoized using `useMemo` to optimize performance by recalculating only when `data` changes.

- **Active Quizzes**: Filters the quizzes that are not finished.
  ```typescript
  const activeQuizzes =
    data?.results?.filter((quiz: quizType) => !quiz.isFinished) ?? [];
  ```
- **Inactive Quizzes**: Filters the quizzes that are finished and adds a demo quiz data.

  ```typescript
  const inactiveQuizzes = [
    ...(data?.results?.filter((quiz: quizType) => quiz.isFinished) ?? []),
    demoQuizData,
  ];
  ```

- **Mid Index**: Calculates the middle index of the inactive quizzes array.

  ```typescript
  const midIndex = Math.floor(inactiveQuizzes.length / 2);
  ```

- **Left and Right Inactive Quizzes**: Splits the inactive quizzes into two halves.
  ```typescript
  const leftInactiveQuizzes = inactiveQuizzes.slice(0, midIndex);
  const rightInactiveQuizzes = inactiveQuizzes.slice(midIndex);
  ```
- **Centered Quizzes**: Combines the left inactive quizzes, active quizzes, and right inactive quizzes into a single array.
  ```typescript
  const centeredQuizzes = [
    ...leftInactiveQuizzes,
    ...activeQuizzes,
    ...rightInactiveQuizzes,
  ];
  ```

if the active quiz does not exist, the default active index is set to 0 to show the `DemoQuiz`
