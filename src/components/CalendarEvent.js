import React from 'react';
import TimeRange from './TimeRange';
import { mapIntervalsToDates } from '../helpers';

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
  // console.log(intervalRange.length)
  return (
    <div
      onMouseDown={e => handleMouseDown(e)}
      className={`${isResizable ? 'event' : ''}`}
      style={{
        position: 'absolute',
        ...(isDescending && {
          transform: 'rotate(180deg)',
          transformOrigin: '50% 23px'
        })
      }}
    >
      {intervalRange.map((interval, i) => {
        return (
          <div
            key={i}
            className='event-interval'
            style={{
              ...(isDescending && {
                transform: 'rotate(180deg)'
              })
            }}
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

export default CalendarEvent;
