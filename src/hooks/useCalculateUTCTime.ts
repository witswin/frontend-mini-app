export const useCalculateStartUTCTime = () => {
  return (startAt: Date) => {
    const now = new Date();

    const nowUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
      )
    );

    if (startAt > nowUTC) {
      return -1;
    }

    const leftTime = startAt.getTime() - nowUTC.getTime();
    return leftTime;
  };
};
