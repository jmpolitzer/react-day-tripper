/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { eventPropTypes } from '../propTypes';
import TimeRange from './TimeRange';
import { mapIntervalsToDates } from '../helpers';
import { eventStyle, eventIntervalStyle } from './styles';

function CalendarEvent(props) {
  const {
    currentEvent,
    resizeEvent,
    isResizable,
    month,
    year,
    dayOfWeek,
    isMilitary
  } = props;
  const { intervals } = currentEvent;
  const isDescending = intervals[0] > intervals[1];
  const intervalRange = mapIntervalsToDates(intervals, year, month, dayOfWeek);

  const handleMouseDown = e => {
    resizeEvent(e, currentEvent);
  };

  const eventContent = (
    <div>
      <TimeRange
        intervals={intervalRange}
        isDescending={isDescending}
        isMilitary={isMilitary}
      />
      <div>{currentEvent.description}</div>
    </div>
  );

  return (
    <div
      onMouseDown={e => handleMouseDown(e)}
      css={eventStyle(isResizable, isDescending)}
    >
      {intervalRange.map((interval, i) => {
        return (
          <div
            key={i}
            css={eventIntervalStyle(isDescending)}
            data-date={interval}
          >
            {isDescending
              ? i === intervals.length - 1 && eventContent
              : i === 0 && eventContent}
          </div>
        );
      })}
    </div>
  );
}

CalendarEvent.propTypes = {
  currentEvent: eventPropTypes,
  resizeEvent: PropTypes.func.isRequired,
  isResizable: PropTypes.bool.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.string.isRequired,
  isMilitary: PropTypes.bool.isRequired
};

export default CalendarEvent;
