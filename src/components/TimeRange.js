import React from 'react';

function TimeRange(props) {
  /* TODO: Move formatTime method to helpers directory. */

  const { intervals, isDescending } = props;
  const range = isDescending ? intervals.slice().reverse() : intervals;
  const getTime = date => `${date.getHours()}:${date.getMinutes()}`;
  const start = getTime(new Date(range[0]));
  const endDate = new Date(range[range.length - 1]);
  const end = getTime(new Date(endDate.setMinutes(endDate.getMinutes() + 15)));

  return <div>{`${start} - ${end}`}</div>;
}

export default TimeRange;
