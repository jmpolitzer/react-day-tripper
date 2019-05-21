import React from 'react';
import { getFormattedTime } from '../helpers';

function TimeRange(props) {
  const { intervals, isDescending, isMilitary } = props;
  const range = isDescending ? intervals.slice().reverse() : intervals;
  const startDate = new Date(range[0]);
  const start = getFormattedTime(startDate, isMilitary);
  const endDate = new Date(range[range.length - 1]);
  const end = getFormattedTime(
    new Date(endDate.setMinutes(endDate.getMinutes() + 15)),
    isMilitary
  );

  return <div>{`${start} - ${end}`}</div>;
}

export default TimeRange;
