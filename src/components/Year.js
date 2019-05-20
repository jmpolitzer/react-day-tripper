import React from 'react';
import Navigation from './Navigation';
import Month from './Month';

function Year(props) {
  const {
    year: currentYear,
    changeView,
    goToNextYear,
    goToPreviousYear
  } = props;
  const { year: yearStringName, quarters } = currentYear;

  const getYearNavTitle = () => {
    return (
      <div>
        <h1>{yearStringName}</h1>
      </div>
    );
  };

  return (
    <div>
      <Navigation
        previous={goToPreviousYear}
        next={goToNextYear}
        title={getYearNavTitle()}
        changeView={changeView}
      />
      <div>
        {quarters.map((quarter, i) => (
          <div className='year-row' key={i}>
            {quarter.map((month: any, j: number) => (
              <Month key={j} month={month} changeView={changeView} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Year;
