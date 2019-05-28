const getMinutesFromInterval = interval =>
  interval.length === 3
    ? interval.slice(1, interval.length)
    : interval.slice(2, interval.length);

export default getMinutesFromInterval;
