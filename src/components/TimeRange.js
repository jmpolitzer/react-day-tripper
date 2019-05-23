import React from 'react';
import PropTypes from 'prop-types';
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

TimeRange.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  isDescending: PropTypes.bool.isRequired,
  isMilitary: PropTypes.bool.isRequired
};

export default TimeRange;
