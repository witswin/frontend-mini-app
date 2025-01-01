# Hooks

In this module we have hooks for context state and setter functions.

also we have `useGetCardState` it as the same as `useGetHomeCardState` but it's for the quiz page. it gets the card state and the card id and returns the card state.

### useGetCardState Hook

#### Parameters:
- `competition`: An object of type `quizType` representing the competition details.

#### State Variables:
- `competitionState`: The current state of the competition card, initialized to `undefined`.
- `timeState`: The current time state, initialized to `undefined`.

#### Dependencies:
- `enrolledChecker`: A function to check if the user is enrolled in the competition.
- `convertedStartAt`: The start time of the competition converted to a timestamp.

#### useEffect (Interval):
- Sets an interval to update the `timeState` every second based on the remaining time until the competition starts.
  - `default`: More than `LOBBY_THRESHOLD` milliseconds remaining.
  - `lobby`: Between `LOBBY_THRESHOLD` and 10,000 milliseconds remaining.
  - `close`: Between 10,000 and 0 milliseconds remaining.
  - `expired`: Less than 0 milliseconds remaining.
- Clears the interval on component unmount.

#### useEffect (Competition State):
- Updates the `competitionState` based on the `timeState` and enrollment status.
  - If not enrolled and time is not expired, set state to `CARD_STATE.enroll`.
  - If `timeState` is `default` and resources are available, set state to `CARD_STATE.resource`.
  - If `timeState` is `lobby`, set state to `CARD_STATE.lobby`.
  - If `timeState` is `close`, set state to `CARD_STATE.join`.
  - Otherwise, set state to `CARD_STATE.watch`.

#### Return:
- Returns the current `competitionState`.

#### Example Usage:
```typescript
const competitionState = useGetCardState(competition);
```