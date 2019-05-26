/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { weekPropTypes, eventPropTypes } from '../propTypes';
import Navigation from './Navigation';
import Day from './Day';
import {
  clickableStyle,
  currentStyle,
  displayFlexStyle,
  weekDayRangeStyle,
  weekDayStyle,
  weekDayHeaderStyle
} from './styles';

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
      <div css={displayFlexStyle}>
        <div css={clickableStyle} onClick={() => changeView('month')}>
          {firstDay.month}
        </div>
        <div css={weekDayRangeStyle}>
          {`${firstDay.dayOfWeek} - ${lastDay.dayOfWeek},`}
        </div>
        <div css={clickableStyle} onClick={() => changeView('year')}>
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
      <div css={displayFlexStyle}>
        {currentWeek.map((day, i) => {
          const { dayOfWeek, date } = day;
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div key={i} css={weekDayStyle}>
              <div css={weekDayHeaderStyle}>
                <div
                  css={{
                    ...clickableStyle,
                    ...(isToday && currentStyle)
                  }}
                  onClick={() => changeView('day', date)}
                >
                  {headers[i].long}
                </div>
                <div
                  css={{
                    ...clickableStyle,
                    ...(isToday && currentStyle)
                  }}
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
  week: weekPropTypes,
  changeView: PropTypes.func,
  goToPreviousWeek: PropTypes.func,
  goToNextWeek: PropTypes.func,
  saveEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(eventPropTypes)
};

export default Week;
