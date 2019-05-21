import { getEveningStatus, getIntervalHourOrMinutes } from './helpers';

export default function getFormattedTime(date, isMilitary) {
  const isEvening = getEveningStatus(date, isMilitary);

  return `${getIntervalHourOrMinutes(
    date,
    0,
    isMilitary
  )}:${getIntervalHourOrMinutes(date, 1, isMilitary)}${isEvening ? 'p' : ''}`;
}
