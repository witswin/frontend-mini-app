# Main components

The main components of this application are:

1. **AxiosAuthProvider**: This component is responsible for managing the authentication of the Telegram API. it add the token to the header of the request and return the null value.

2. **BottomModal**: This component is responsible for displaying the base modal. it could be a real modal component but because of the design animation, we have to simulate that with drawer. its reusable and accept the Chakra ui modal props and other props to customize the modal.

3. **BottomNavbar**: This component is used for bottom navbar. it's a simple component that accepts the children and display them in the bottom navbar.

4. **Card**: This component is used for displaying the quiz card. its one of the components that used in various places in the application. it accepts Chakra Box props and **colored** props. the colored prop is used for changing the border color of the card.

5. **ChoiceButton**: this component is for question component to show the choices of the question. it accepts the choice that follow the choice type and the disabledFiftyFiftyHint prop that used to disable the hint of the fifty fifty.
   this component is very dependent on the question state. the click handler is send the user choice with the **WS** to the server and the server will return the add_choice event with the result of the choice. also we check is the user is Eligible or not. if the user used extra time hint, we send the **GET_HINT** event to the server and the server will accept it. this button also be as a stats hint button. if the user click on the stats hint button, the design of the choice button will change and the user can see the stats of the choices. this button has various variants.
   The `variant` constant is a memoized object that determines the visual state of a choice button based on the current question state and the user's selection. It uses the `useMemo` hook to optimize performance by recalculating only when dependencies change.

- **QUESTION_STATE.default**: If the selected choice matches the current choice, the button is in the 'pressed' state; otherwise, it is in the 'default' state.
- **QUESTION_STATE.freeze**: The button is always in the 'default' state and disabled style.
- **QUESTION_STATE.answered**:
  - If the selected choice matches the current choice and is the correct answer, the button is in the 'rightAnswer' state.
  - If the selected choice matches the current choice but is not the correct answer, the button is in the 'wrongAnswer' state.
  - If user doesn't have any choice, we show the correct answer so the button is in the 'rightAnswer' state.
  - Otherwise, the button is in the 'default' state.
- **QUESTION_STATE.alert**: If the selected choice matches the current choice, the button is in the 'pressed' state; otherwise, it is in the 'default' state.

Dependencies for recalculating the `variant` object include `question.correct`, `question.selectedChoice`, and `socket.current.client`.

6. **CircularPattern**: This component is used for displaying some shadows in the background of the application.

7. **ColorFullText**: In design we have some text that have a gradient color. this component is used for that. it accepts the `textContent` and the `gradientColor` props that used for the gradient color.

8. **CountDown**: This component is used in various places in the quiz cards. It accepts the following props and displays the countdown of the date:
   - `date`: `Date | number`: The date to count down to.
   - `dateTimeStyle?`: `BoxProps`: its used for the customizing `TimerBox` that shows the calendar and date component.
   - `timerStyle?`: `BoxProps`: its used for the customizing `TimerBox` component.
   - `containerStyle?`: `BoxProps` : its used for the customizing `CountDown` component container.
   - `shows`: in some cases we don't want to show the day or hour or min or sec. so we can use this prop to show or hide them. it accepts the following props:
     - `info?`: `boolean`
     - `day?`: `boolean`
     - `hour?`: `boolean`
     - `min?`: `boolean`
     - `sec?`: `boolean`
9. **TimerBox**: This component is used for displaying the timer.
10. **DemoQuizCard**: We have a demo quiz card it is same as the quiz card but we separate all demo components from the main components.

11. **HintButtons**: This component is for hints. it accept two props: - `hint`: `selectedHint`: The hints to display. - `isDisabled`: `boolean`: Whether the hints are disabled.
    in this component we check is the hint used before or not. if the hint used before we ignore the click event. if the hint is not used before we send the **GET_HINT** event to the server and the server will accept it. selectedHint can be one of the following values: - `fiftyFifty` - `time` - `stats`
    if hint type is time, we add more seconds to the question countdown. in click handler we also update the used hint state.

12. **HintCards**: This component is used for displaying the hint cards. users can select hints when they want to enroll quiz. in click handler we update the selected hints state.

13. **Layout**: This component is used for the layout of the application. it accepts the children and display them in the layout.

14. **Loading**: This component is used for displaying the loading spinner.

15. **MiniAppNavigation**: we have an issue for shared link. because this app is running in the telegram and it is a mini app, we should handle the shared link. in telegram mini apps we don't have the browser and we can't handle the shared link. so we have to handle the shared link in the app. this component is used for that. telegram accept sth in the `window?.Telegram?.WebApp?.initDataUnsafe?.start_param`. so we check this value and if it is not null we send the **page** with *_* convention and change the route with the `useRouter` hook.
the init data also has the referralCode. some of the quizzes are *VIP* and they have referral code. so some shared links have the referral code like this: https://t.me/Witswinbot/WebApp?startapp=page_quiz_3_referralCode_123456. so we check the referral code.

16. **ParticipantsCount**: This component is used for displaying the participants count in the quiz card. this component accepts the `quiz` prop. it checks the count of the participants and show the state of the quiz e.g. *closed* or *will close soon*.

17. **PrivateBadge**: The VIP quizzes have this badge to separate them from the other quizzes.

18. **ProgressTimer**: This component is used for displaying the progress timer in the but it is the top layer of **Progress** component for customize it.

19. **Progress**: This component is used for displaying the progress timer in the question card.

20. **QuizCard**: This component is the main component of the app. it has several state.
this state's are depend the `CARD_STATE` enum. also we have a `CTA` with different state. user can enroll, see the resources, watch the winners and etc.

21. **TopNavbar**: This component is to display the main header of the app.

22. **WalletModal**: This modal for connecting the user's wallet to the app. in this component we check if the user has wallet before, we don't get from the user sign message else we get the sign message from the user.
