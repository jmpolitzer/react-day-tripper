import React from 'react';
import Navigation from './Navigation';
import Day from './Day';

function Week(props) {
  const {
    week,
    changeView,
    goToNextWeek,
    goToPreviousWeek,
    saveEvent,
    modifyEvent,
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
                modifyEvent={modifyEvent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Week;
