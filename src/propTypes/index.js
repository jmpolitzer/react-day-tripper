import PropTypes from 'prop-types';

const headersPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    single: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    long: PropTypes.string.isRequired
  })
).isRequired;

const dayPropTypes = PropTypes.shape({
  dayOfWeek: PropTypes.string.isRequired,
  dayString: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  day: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date)))
    .isRequired,
  date: PropTypes.instanceOf(Date).isRequired
}).isRequired;

const weekPropTypes = PropTypes.shape({
  headers: headersPropTypes,
  week: PropTypes.arrayOf(dayPropTypes).isRequired
}).isRequired;

const monthPropTypes = PropTypes.shape({
  headers: headersPropTypes,
  year: PropTypes.string.isRequired,
  month: PropTypes.shape({
    index: PropTypes.number.isRequired,
    stringName: PropTypes.string.isRequired
  }),
  weeks: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        dayOfWeek: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired
      }).isRequired
    ).isRequired
  ).isRequired
}).isRequired;

const yearPropTypes = PropTypes.shape({
  year: PropTypes.number.isRequired,
  quarters: PropTypes.arrayOf(PropTypes.arrayOf(monthPropTypes).isRequired)
    .isRequired
}).isRequired;

const eventPropTypes = PropTypes.shape({
  id: PropTypes.string,
  description: PropTypes.string,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  intervals: PropTypes.arrayOf(PropTypes.string)
}).isRequired;

export {
  dayPropTypes,
  weekPropTypes,
  monthPropTypes,
  yearPropTypes,
  eventPropTypes
};
