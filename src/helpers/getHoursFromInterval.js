const getHoursFromInterval = interval =>
  interval.length === 3 ? interval.slice(0, 1) : interval.slice(0, 2);

export default getHoursFromInterval;
