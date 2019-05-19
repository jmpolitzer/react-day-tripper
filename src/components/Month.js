import React from 'react';
import Navigation from './Navigation';

function Month(props) {
  const {
    month: currentMonth,
    changeView,
    isMonthView,
    goToPreviousMonth,
    goToNextMonth
  } = props;
  const { headers, weeks, month, year } = currentMonth;

  const getMonthNavHeader = () => {
    return (
      <h1>
        <span>{month.stringName} </span>
        <span className='clickable' onClick={() => changeView('year')}>
          {year}
        </span>
      </h1>
    );
  };

  return (
    <div className='month'>
      {isMonthView ? (
        <Navigation
          previous={goToPreviousMonth}
          next={goToNextMonth}
          title={getMonthNavHeader()}
        />
      ) : (
        <div>
          <h1
            className='clickable'
            onClick={() =>
              changeView('month', new Date(parseInt(year), month.index, 1))
            }
          >
            {month.stringName}
          </h1>
        </div>
      )}
      <div className='month-row month-headers'>
        {headers.map((header, i) => (
          <div className='month-square' key={i}>
            {header.single}
          </div>
        ))}
      </div>
      <div>
        {weeks.map((week, i) => {
          return (
            <div className='month-row' key={i}>
              {week.map((day, j) => {
                const isToday =
                  day.date.toDateString() === new Date().toDateString();

                return (
                  <div
                    className={`month-square clickable ${
                      isToday ? 'current' : ''
                    }`}
                    key={j}
                    onClick={() => changeView('day', day.date)}
                  >
                    {month.index === day.date.getMonth() && day.dayOfWeek}
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

export default Month;
