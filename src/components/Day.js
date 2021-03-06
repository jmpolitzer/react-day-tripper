/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { dayPropTypes, eventPropTypes } from '../propTypes';
import Navigation from './Navigation';
import CalendarEvent from './CalendarEvent';
import useEvent from '../hooks/useEvent';
import CurrentTime from './CurrentTime';
import {
  getEveningStatus,
  getIntervalHourOrMinutes,
  mapIntervalsToDates
} from '../helpers';
import {
  displayFlexStyle,
  dayHeadersStyle,
  clickableStyle,
  quarterLineStyle,
  dayIntervalStyle,
  hourStyle,
  timeLabelStyle,
  eveningLabelStyle,
  buttonStyle
} from './styles';

function Day(props) {
  const {
    day,
    changeView,
    isDayView,
    goToPreviousDay,
    goToNextDay,
    isMilitary = false,
    saveEvent,
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
        id: currentEvent.id,
        description: currentEvent.description || 'A New Event!',
        start: eventDates[0],
        end: eventDates[eventDates.length - 1]
      };

      saveEvent(eventToSave);
    }
  };

  const getCurrentTimeStatus = quarter => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isSameHour = quarter.getHours() === now.getHours();
    const todayMinutes = now.getMinutes();
    const quarterMinutes = quarter.getMinutes();
    const isSameQuarter =
      todayMinutes >= quarterMinutes && todayMinutes < quarterMinutes + 15;

    return isToday && isSameHour && isSameQuarter;
  };

  const getEvents = quarter => {
    const { start } = currentEvent;
    const formattedQuarter = formatQuarter(quarter);
    /*
      If our currentEvent is being modified, the old version will be filtered out of the existing events
      and the new one will be concatendated
    */
    const formattedEvents = formatEvents().filter(
      event => event.id !== currentEvent.id
    );
    const eventsAndCurrentEvent =
      quarter.getDay() === start.getDay()
        ? formattedEvents.concat(currentEvent)
        : formattedEvents;

    return eventsAndCurrentEvent.filter(
      event => event.intervals[0] === formattedQuarter
    );
  };

  const getDayNavTitle = () => {
    return (
      <div css={{ ...displayFlexStyle, ...dayHeadersStyle }}>
        <div>{dayString}</div>
        <div onClick={() => changeView('month')} css={clickableStyle}>
          {month}
        </div>
        <div>{dayOfWeek},</div>
        <div onClick={() => changeView('year')} css={clickableStyle}>
          {year}
        </div>
      </div>
    );
  };

  return (
    <div>
      {isDayView && (
        <button css={buttonStyle} onClick={() => changeView('week')}>
          Week
        </button>
      )}
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
            <div key={i}>
              {hour.map((quarter, j) => {
                const isHour = j % 4 === 0;
                const isEvening =
                  isHour && getEveningStatus(quarter, isMilitary);
                const isCurrentInterval = getCurrentTimeStatus(quarter);

                return (
                  <div key={j}>
                    {getEvents(quarter).map((event, k) => {
                      return (
                        <CalendarEvent
                          key={k}
                          currentEvent={event}
                          resizeEvent={resizeEvent}
                          isResizable={isResizable}
                          month={quarter.getMonth()}
                          year={year}
                          dayOfWeek={dayOfWeek}
                          isMilitary={isMilitary}
                        />
                      );
                    })}
                    <div css={quarterLineStyle} />
                    <div
                      className={`${isHour ? 'hour' : 'minutes'}`}
                      style={{ ...dayIntervalStyle, ...(isHour && hourStyle) }}
                      data-date={quarter}
                    >
                      <div css={timeLabelStyle}>
                        <div>
                          {getIntervalHourOrMinutes(quarter, j, isMilitary)}
                        </div>
                        {isEvening && <div css={eveningLabelStyle}>p</div>}
                      </div>
                      {isCurrentInterval && (
                        <CurrentTime isMilitary={isMilitary} />
                      )}
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

Day.propTypes = {
  day: dayPropTypes,
  changeView: PropTypes.func,
  isDayView: PropTypes.bool,
  goToPreviousDay: PropTypes.func,
  goToNextDay: PropTypes.func,
  isMilitary: PropTypes.bool,
  saveEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(eventPropTypes)
};

export default Day;
