import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Day from './Day';

function Week(props) {
  const {
    week,
    changeView,
    goToNextWeek,
    goToPreviousWeek,
    saveEvent,
    events
  } = props;
  const { headers, week: currentWeek } = week;
  const firstDay = currentWeek[0];
  const lastDay = currentWeek[currentWeek.length - 1];

  const getWeekNavTitle = () => {
    return (
      <div className='week-nav-header'>
        <div className='clickable' onClick={() => changeView('month')}>
          {firstDay.month}
        </div>
        <div className='weekday-range'>
          {`${firstDay.dayOfWeek} - ${lastDay.dayOfWeek},`}
        </div>
        <div className='clickable' onClick={() => changeView('year')}>
          {lastDay.year}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navigation
        previous={goToPreviousWeek}
        next={goToNextWeek}
        title={getWeekNavTitle()}
        changeView={changeView}
      />
      <div className='week'>
        {currentWeek.map((day, i) => {
          const { dayOfWeek, date } = day;
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div key={i} className='weekday'>
              <div className='weekday-header'>
                <div
                  className={`clickable ${isToday ? 'current' : ''}`}
                  onClick={() => changeView('day', date)}
                >
                  {headers[i].long}
                </div>
                <div
                  className={`clickable ${isToday ? 'current' : ''}`}
                  onClick={() => changeView('day', date)}
                >
                  {dayOfWeek}
                </div>
              </div>
              <Day
                day={day}
                changeView={changeView}
                events={events.filter(e => e.start.getDay() === date.getDay())}
                saveEvent={saveEvent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

Week.propTypes = {
  week: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        single: PropTypes.string.isRequired,
        short: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        long: PropTypes.string.isRequired
      })
    ).isRequired,
    week: PropTypes.arrayOf(
      PropTypes.shape({
        dayOfWeek: PropTypes.string,
        dayString: PropTypes.string,
        month: PropTypes.string,
        year: PropTypes.string,
        day: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))),
        date: PropTypes.instanceOf(Date)
      })
    ).isRequired
  }).isRequired,
  changeView: PropTypes.func,
  goToPreviousWeek: PropTypes.func,
  goToNextWeek: PropTypes.func,
  saveEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired
    })
  )
};

export default Week;
