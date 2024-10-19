export const convertMinuteToHours = (minute: number) => {
  if (minute >= 60) {
    const secound = minute * 60;
    if (secound % 3600 === 0) {
      return `${secound / 3600}`;
    } else {
      const hours = Math.floor(secound / 3600);
      const minute = (secound % 3600) / 60;
      return `${hours}ч ${minute}мин`;
    }
  }
};
