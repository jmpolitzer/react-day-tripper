export default function getIntervalHourOrMinutes(date, index, isMilitary) {
  const militaryHour = date.getHours();
  const dateMinutes = date.getMinutes();
  const minutes =
    dateMinutes === 0
      ? '00'
      : dateMinutes % 10 === dateMinutes
        ? `0${dateMinutes}`
        : dateMinutes;
  const standardHour =
    militaryHour === 0
      ? 12
      : militaryHour < 13
        ? militaryHour
        : militaryHour - 12;
  const hour = isMilitary ? militaryHour : standardHour;

  return index % 4 === 0 ? hour : minutes;
}
