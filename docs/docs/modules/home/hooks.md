# Hooks

This section is about the Home modules' hooks

- `useCheckEnrolled`: This hook is used to check the user is enrooled any quiz or not. it return a function that get a param as the quizId

- `useGetHomeCardState`: This hook is used to get the state of the quiz. first we check is the quiz is enrolled by the user or not. then we check the quiz start time and the current time. then we return the state of the quiz. we use the temp `timeState` state and depend that state return the state of the quiz. if `calculatedTime > LOBBY_THRESHOLD` we return the `default` timeState. if `calculatedTime <= LOBBY_THRESHOLD && calculatedTime > 10000` we return the `lobby` timeState. if the `calculatedTime <= 10000` we return the `close` timeState. else the quiz is expired.

this is the timeState state. the quiz state check the timeState and return the quiz state. 

The `useEffect` hook manages the state of the quiz based on the enrollment status and the current time state. It updates the `competitionState` accordingly.

- **Dependencies**: `timeState`, `isEnrolled`

- If the user is not enrolled (`!isEnrolled`):
  - Set the competition state to `INFO_CARD_STATE.welcome`.
- If the user is enrolled:
  - If `timeState` is `'default'`:
    - If there are resources available (`competition.resources.length !== 0`):
      - Set the competition state to `INFO_CARD_STATE.resource`.
    - Otherwise:
      - Set the competition state to `INFO_CARD_STATE.lobby`.
  - If `timeState` is `'lobby'`:
    - Set the competition state to `INFO_CARD_STATE.lobby`.
  - If `timeState` is `'close'`:
    - Set the competition state to `INFO_CARD_STATE.join`.
  - If the competition is finished (`competition.isFinished`):
    - Set the competition state to `INFO_CARD_STATE.welcome`.
  - Otherwise:
    - Set the competition state to `INFO_CARD_STATE.watch`.