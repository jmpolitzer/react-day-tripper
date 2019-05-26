import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { eventPropTypes } from '../propTypes';
import useCalendar from '../hooks/useCalendar';
import Day from './Day';
import Week from './Week';
import Month from './Month';
import Year from './Year';

function Calendar(props) {
  const { events, saveEvent } = props;
  const [currentView, setCurrentView] = useState('day');
  const {
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear,
    getDay,
    goToNextDay,
    goToPreviousDay,
    getWeek,
    goToNextWeek,
    goToPreviousWeek,
    getEventsForDay,
    getEventsForWeek,
    getEventsForMonth,
    getEventsForYear
  } = useCalendar();

  const day = useMemo(() => getDay(), [getDay]);
  const week = useMemo(() => getWeek(), [getWeek]);
  const month = useMemo(() => getMonth(), [getMonth]);
  const year = useMemo(() => getYear(), [getYear]);

  const dayEvents = useMemo(() => getEventsForDay(events), [
    events,
    getEventsForDay
  ]);
  const weekEvents = useMemo(() => getEventsForWeek(events), [
    events,
    getEventsForWeek
  ]);
  const monthEvents = useMemo(() => getEventsForMonth(events), [
    events,
    getEventsForMonth
  ]);
  const yearEvents = useMemo(() => getEventsForYear(events), [
    events,
    getEventsForYear
  ]);

  const changeView = (view, date) => {
    date && setDate(date);
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === 'day' && (
        <Day
          day={day}
          changeView={changeView}
          isDayView
          goToNextDay={goToNextDay}
          goToPreviousDay={goToPreviousDay}
          saveEvent={saveEvent}
          events={dayEvents}
        />
      )}
      {currentView === 'week' && (
        <Week
          week={week}
          changeView={changeView}
          goToNextWeek={goToNextWeek}
          goToPreviousWeek={goToPreviousWeek}
          saveEvent={saveEvent}
          events={weekEvents}
        />
      )}
      {currentView === 'month' && (
        <Month
          month={month}
          changeView={changeView}
          isMonthView
          goToNextMonth={goToNextMonth}
          goToPreviousMonth={goToPreviousMonth}
          events={monthEvents}
        />
      )}
      {currentView === 'year' && (
        <Year
          year={year}
          changeView={changeView}
          goToNextYear={goToNextYear}
          goToPreviousYear={goToPreviousYear}
          events={yearEvents}
        />
      )}
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(eventPropTypes),
  saveEvent: PropTypes.func.isRequired
};

export default Calendar;
