import React from 'react';
import PropTypes from 'prop-types';
import { yearPropTypes } from '../propTypes';
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

Year.propTypes = {
  year: yearPropTypes,
  changeView: PropTypes.func.isRequired,
  goToNextYear: PropTypes.func.isRequired,
  goToPreviousYear: PropTypes.func.isRequired
};

export default Year;
