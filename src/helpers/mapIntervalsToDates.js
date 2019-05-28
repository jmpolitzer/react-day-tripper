import getHoursFromInterval from './getHoursFromInterval';
import getMinutesFromInterval from './getMinutesFromInterval';

export default function mapIntervalsToDates(intervals, year, month, dayOfWeek) {
  return intervals.map(
    interval =>
      new Date(
        parseInt(year, 10),
        parseInt(month, 10),
        parseInt(dayOfWeek, 10),
        parseInt(getHoursFromInterval(interval), 10),
        parseInt(getMinutesFromInterval(interval), 10)
      )
  );
}
