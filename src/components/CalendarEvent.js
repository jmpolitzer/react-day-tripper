import React from 'react';
import TimeRange from './TimeRange';
import { mapIntervalsToDates } from '../helpers';

function CalendarEvent(props) {
  const {
    currentEvent,
    modifyEvent,
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
    isResizable && currentEvent.id && modifyEvent(currentEvent);
    resizeEvent(e, currentEvent);
  };

  const eventContent = (
    <TimeRange
      intervals={intervalRange}
      isDescending={isDescending}
      isMilitary={isMilitary}
    />
  );

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
