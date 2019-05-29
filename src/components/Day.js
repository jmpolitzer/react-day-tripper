/** @jsx jsx */
import { jsx } from '@emotion/core';
import { memo, Fragment } from 'react';
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
  clickableStyle,
  dayHeadersStyle,
  dayIntervalStyle,
  quarterLineStyle,
  hourStyle,
  timeLabelStyle,
  eveningLabelStyle
} from './styles';

const formatQuarter = quarter => {
  const quarterHour = quarter.getHours();
  const quarterMinutes =
    quarter.getMinutes() === 0 ? '00' : quarter.getMinutes();

  return `${quarterHour}${quarterMinutes}`;
};

const DayNavTitle = memo(props => {
  const { dayString, month, dayOfWeek, year, changeView } = props;

  return (
    <div css={[displayFlexStyle, dayHeadersStyle]}>
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
});

const Events = memo(props => {
  const {
    events,
    resizeEvent,
    isResizable,
    month,
    year,
    dayOfWeek,
    isMilitary
  } = props;

  return (
    <Fragment>
      {events.map((event, k) => {
        return (
          <CalendarEvent
            key={k}
            currentEvent={event}
            resizeEvent={resizeEvent}
            isResizable={isResizable}
            month={month}
            year={year}
            dayOfWeek={dayOfWeek}
            isMilitary={isMilitary}
          />
        );
      })}
    </Fragment>
  );
});

const QuarterLine = memo(() => <div css={quarterLineStyle} />);
const QuarterSlot = memo(props => {
  const {
    quarter,
    value,
    isHour,
    isMilitary,
    isEvening,
    isCurrentInterval
  } = props;

  return (
    <div
      data-date={quarter}
      data-interval={isHour ? 'hour' : 'minutes'}
      css={dayIntervalStyle}
    >
      <div css={timeLabelStyle}>
        <div css={isHour && hourStyle}>{value}</div>
        {isEvening && <div css={eveningLabelStyle}>p</div>}
      </div>
      {isCurrentInterval && <CurrentTime isMilitary={isMilitary} />}
    </div>
  );
});

const DayColumn = memo(props => {
  const {
    currentDay,
    currentEvent,
    isMilitary,
    resizeEvent,
    isResizable,
    year,
    dayOfWeek,
    date,
    events
  } = props;

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

  return (
    <Fragment>
      {currentDay.map((hour, i) => {
        return (
          <div key={i}>
            {hour.map((quarter, j) => {
              const isHour = j % 4 === 0;
              const isEvening = isHour && getEveningStatus(quarter, isMilitary);
              const isCurrentInterval = getCurrentTimeStatus(quarter);

              return (
                <div key={j}>
                  <Events
                    events={getEvents(quarter)}
                    resizeEvent={resizeEvent}
                    isResizable={isResizable}
                    month={quarter.getMonth()}
                    year={year}
                    dayOfWeek={dayOfWeek}
                    isMilitary={isMilitary}
                  />
                  <QuarterLine />
                  <QuarterSlot
                    quarter={formatQuarter(quarter)}
                    value={getIntervalHourOrMinutes(quarter, j, isMilitary)}
                    isHour={isHour}
                    isMilitary={isMilitary}
                    isEvening={isEvening}
                    isCurrentInterval={isCurrentInterval}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </Fragment>
  );
});

const Day = memo(props => {
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

  const NavTitle = (
    <DayNavTitle
      dayString={dayString}
      month={month}
      dayOfWeek={dayOfWeek}
      year={year}
      changeView={changeView}
    />
  );

  return (
    <div>
      {isDayView && <button onClick={() => changeView('week')}>Week</button>}
      {isDayView && (
        <Navigation
          previous={goToPreviousDay}
          next={goToNextDay}
          title={NavTitle}
          changeView={changeView}
        />
      )}
      <div
        onMouseDown={(e: any) => createEvent(e, date)}
        onMouseUp={formatAndSaveEvent}
      >
        <DayColumn
          currentDay={currentDay}
          currentEvent={currentEvent}
          isMilitary={isMilitary}
          resizeEvent={resizeEvent}
          isResizable={isResizable}
          year={year}
          dayOfWeek={dayOfWeek}
          date={date}
          events={events}
        />
      </div>
    </div>
  );
});

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
