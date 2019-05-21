import React from 'react';
import Navigation from './Navigation';
import CalendarEvent from './CalendarEvent';
import useEvent from '../hooks/useEvent';
import {
  getEveningStatus,
  getIntervalHourOrMinutes,
  mapIntervalsToDates
} from '../helpers';

function Day(props) {
  const {
    day,
    changeView,
    isDayView,
    goToPreviousDay,
    goToNextDay,
    isMilitary = false,
    saveEvent,
    modifyEvent,
    events
  } = props;
  const { dayOfWeek, dayString, month, year, day: currentDay, date } = day;
  const { currentEvent, createEvent, resizeEvent, isResizable } = useEvent();

  const formatQuarter = quarter => {
    const quarterHour = quarter.getHours();
    const quarterMinutes =
      quarter.getMinutes() === 0 ? '00' : quarter.getMinutes();

    return `${quarterHour}${quarterMinutes}`;
  };

  const formatEvents = () => {
    return events.map(event => {
      const { start, end } = event;
      const intervalCount = (end - start) / 1000 / 60 / 15 + 1;
      const intervals = [...Array(intervalCount)].map((_, i) => {
        const startCopy = new Date(start);
        const minutes = i * 15;

        return formatQuarter(
          new Date(startCopy.setMinutes(startCopy.getMinutes() + minutes))
        );
      });

      return {
        ...event,
        intervals
      };
    });
  };

  const formatAndSaveEvent = () => {
    if (currentEvent.intervals.length > 0) {
      const { intervals } = currentEvent;
      const firstInterval = intervals[0];
      const lastInterval = intervals[intervals.length - 1];
      const orderedEvents =
        firstInterval < lastInterval ? intervals : intervals.reverse();
      const eventDates = mapIntervalsToDates(
        orderedEvents,
        year,
        date.getMonth(),
        dayOfWeek
      );
      const eventToSave = {
        start: eventDates[0],
        end: eventDates[eventDates.length - 1],
        description: 'A new event!'
      };

      saveEvent(eventToSave);
    }
  };

  const getDayNavTitle = () => {
    return (
      <div className='day-headers'>
        <div>{dayString}</div>
        <div onClick={() => changeView('month')} className='clickable'>
          {month}
        </div>
        <div>{dayOfWeek},</div>
        <div onClick={() => changeView('year')} className='clickable'>
          {year}
        </div>
      </div>
    );
  };

  const getCurrentTime = quarter => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isSameHour = quarter.getHours() === now.getHours();
    const todayMinutes = now.getMinutes();
    const quarterMinutes = quarter.getMinutes();
    const isSameQuarter =
      todayMinutes >= quarterMinutes && todayMinutes < quarterMinutes + 15;
    const isEvening = getEveningStatus(quarter, true, isMilitary);

    return isToday && isSameHour && isSameQuarter ? (
      <div className='current-time current'>{`${getIntervalHourOrMinutes(
        now,
        0,
        isMilitary
      )}:${getIntervalHourOrMinutes(now, 1, isMilitary)}${
        isEvening ? 'p' : ''
      }`}</div>
    ) : null;
  };

  const getEvents = quarter => {
    const { start } = currentEvent;
    const formattedQuarter = formatQuarter(quarter);
    const formattedEvents = formatEvents();
    const eventsAndCurrentEvent =
      quarter.getDay() === start.getDay()
        ? formattedEvents.concat(currentEvent)
        : formattedEvents;

    return eventsAndCurrentEvent.filter(
      event => event.intervals[0] === formattedQuarter
    );
  };

  return (
    <div>
      {isDayView && <button onClick={() => changeView('week')}>Week</button>}
      {isDayView && (
        <Navigation
          previous={goToPreviousDay}
          next={goToNextDay}
          title={getDayNavTitle()}
          changeView={changeView}
        />
      )}
      <div
        onMouseDown={(e: any) => createEvent(e)}
        onMouseUp={formatAndSaveEvent}
      >
        {currentDay.map((hour, i) => {
          return (
            <div key={i} className='quarter'>
              {hour.map((quarter, j) => {
                const isHour = j % 4 === 0;
                const isEvening = getEveningStatus(quarter, isHour, isMilitary);

                return (
                  <div key={j}>
                    {getEvents(quarter).map((event, k) => {
                      return (
                        <CalendarEvent
                          key={k}
                          currentEvent={event}
                          modifyEvent={modifyEvent}
                          resizeEvent={resizeEvent}
                          isResizable={isResizable}
                          month={quarter.getMonth()}
                          year={year}
                          dayOfWeek={dayOfWeek}
                          isMilitary={isMilitary}
                        />
                      );
                    })}
                    <div className='quarter-line' />
                    <div
                      className={`${isHour ? 'hour' : 'minutes'}`}
                      data-date={quarter}
                    >
                      <div className='time-label'>
                        <div>
                          {getIntervalHourOrMinutes(quarter, j, isMilitary)}
                        </div>
                        {isEvening && <div className='evening'>p</div>}
                      </div>
                      {getCurrentTime(quarter)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
