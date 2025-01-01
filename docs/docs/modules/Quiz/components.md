# Components

Quiz components

1. **QuizEnrolled**: This component is used in the `EnrolledCard`. when quiz will start less that one minute this component navigate user to the lobby page.

2. **QuizInfo**: This is used to `EnrolledCard` and it's one of the enrolled state that user can select hints and enroll quiz. The `QuizInfo` component displays detailed information about a selected quiz, including the prize, number of questions, time per question, and available hints. It uses various hooks and components to fetch and display this information.

   #### Props

   - `setHintModal`: A function to set the state of the hint modal. It is of type `Dispatch<SetStateAction<boolean>>`.

   #### Hooks

   - `useSelectedQuiz`: Get global state the currently selected quiz details.
   - `useHints`: Get global state the hints related to the quiz.
   - `useHintsDispatch`: Dispatch function to update the hints state.
   - `useId`: Generates a unique ID for the component instance.

   #### useEffect

   - Initializes the selected hints based on the built-in hints available in the selected quiz. in this component we set the default 50/50 hint.

   #### Components

   - **QuizPrize**: Displays the prize for the quiz.
   - **ValueCard**: Displays the number of questions and time per question.
   - **HintCard**: Displays the hints box and by click theme user can set the hint.

   #### Memoization

   - The `QuizInfo` component is memoized using `memo` to prevent unnecessary re-renders.

3. **QuizPrivate**: This is also used in the `EnrolledCard`. when the quiz is private or vip this component will open to add the referral code. if the referral code be exist in the url, the input will be filled automatically.

4. **QuizTask**: This component is never used in the project. It was created to display the task of the quiz should be done by the user before user can enroll the quiz.

5. **ArticleCard**: This component is for the resource of the quiz it is reus component for and handle different shape of resources card

   #### Props

   - `header?`: An optional object containing header information.
   - `img`: `string` - The URL of the header image.
   - `title`: `string` - The title text for the header.
   - `CTAText`: `string` - The text for the Call-To-Action button.
   - `CTAAction`: `() => void` - The function to be executed when the Call-To-Action button is clicked.
   - `banner`: `string` - The URL of the banner image.
   - `link`: `string` - The URL for the link.
   - `linkText`: `string` - The text for the link.
   - `articleTitle`: `string` - The title of the article.
   - `content`: `string` - The content of the article.

6. **DemoQuizItem** and **MemoizedSwiperItem**: These components are the main components of quiz PLP page. it shows the quiz item in a card. in these components, we check the intersection of the card with the viewport by `useIntersectionObserver` and if the card is intersected with the viewport we select as a selected quiz. in this card also we check the `cardState` this state is like to `HomeCardState` in the home page but different.

7. **EnrolledCard**: This component is the base component of the `EnrollModal`. it has some steps to enroll the quiz. the first step is `QuizInfo` that user can see the quiz details and select the hints. if the quiz is private we show the `QuizPrivate` component to add the referral code. it has some states else but we dont use them in the project.

8. **SelectHint**: This component shows the built-in hints of the quiz and user can select or remove the hints. it's used in the `QuizInfo` component.
