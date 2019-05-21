import React from 'react';
import { getEveningStatus, getIntervalHourOrMinutes } from '../helpers';

function TimeRange(props) {
  const { intervals, isDescending, isMilitary } = props;
  const range = isDescending ? intervals.slice().reverse() : intervals;
  const getTime = date =>
    `${getIntervalHourOrMinutes(
      date,
      0,
      isMilitary
    )}:${getIntervalHourOrMinutes(date, 1, isMilitary)}`;
  const startDate = new Date(range[0]);
  const start = getTime(startDate);
  const endDate = new Date(range[range.length - 1]);
  const end = getTime(new Date(endDate.setMinutes(endDate.getMinutes() + 15)));
  const startIsEvening = getEveningStatus(startDate, isMilitary);
  const endIsEvening = getEveningStatus(endDate, isMilitary);
  const formatEvening = isEvening => (isEvening ? 'p' : '');

  return (
    <div>{`${start}${formatEvening(startIsEvening)} - ${end}${formatEvening(
      endIsEvening
    )}`}</div>
  );
}

export default TimeRange;
