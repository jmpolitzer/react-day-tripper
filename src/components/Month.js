/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { monthPropTypes } from '../propTypes';
import Navigation from './Navigation';
import {
  clickableStyle,
  displayFlexStyle,
  fontWeightBoldStyle,
  monthSquareStyle,
  currentStyle
} from './styles';

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
        <span css={clickableStyle} onClick={() => changeView('year')}>
          {year}
        </span>
      </h1>
    );
  };

  return (
    <div>
      {isMonthView ? (
        <Navigation
          previous={goToPreviousMonth}
          next={goToNextMonth}
          title={getMonthNavHeader()}
          changeView={changeView}
        />
      ) : (
        <div>
          <h1
            css={clickableStyle}
            onClick={() =>
              changeView('month', new Date(parseInt(year), month.index, 1))
            }
          >
            {month.stringName}
          </h1>
        </div>
      )}
      <div css={{ ...displayFlexStyle, ...fontWeightBoldStyle }}>
        {headers.map((header, i) => (
          <div css={monthSquareStyle} key={i}>
            {header.single}
          </div>
        ))}
      </div>
      <div>
        {weeks.map((week, i) => {
          return (
            <div css={displayFlexStyle} key={i}>
              {week.map((day, j) => {
                const isToday =
                  day.date.toDateString() === new Date().toDateString();

                return (
                  <div
                    css={{
                      ...monthSquareStyle,
                      ...clickableStyle,
                      ...(isToday && currentStyle)
                    }}
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

Month.propTypes = {
  month: monthPropTypes,
  changeView: PropTypes.func.isRequired,
  isMonthView: PropTypes.bool,
  goToPreviousMonth: PropTypes.func,
  goToNextMonth: PropTypes.func
};

export default Month;
