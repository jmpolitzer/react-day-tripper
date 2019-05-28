import { useState, useEffect } from 'react';
import { getHoursFromInterval, getMinutesFromInterval } from '../helpers';

function useEvent() {
  const [isResizable, setIsResizable] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    start: new Date(),
    intervals: []
  });

  useEffect(() => {
    document.addEventListener('mousemove', checkForResizability);
    document.addEventListener('mouseover', checkForResizability);

    return () => {
      document.removeEventListener('mousemove', checkForResizability);
      document.removeEventListener('mouseover', checkForResizability);
    };
  }, []);

  const isInterval = e => {
    const { attributes } = e.target;
    const intervalTypes = ['hour', 'minutes'];

    return (
      attributes['data-interval'] &&
      intervalTypes.includes(attributes['data-interval'].nodeValue)
    );
  };

  const isClickable = e => {
    const parent = e.target.parentNode;

    if (parent.getBoundingClientRect) {
      const { bottom } = parent.getBoundingClientRect();

      return e.clientY > bottom - 5;
    } else {
      return false;
    }
  };

  const createDateFromAttr = (e, day) => {
    const { attributes } = e.target;

    if (attributes['data-date']) {
      const interval = attributes['data-date'].nodeValue;
      const hour = getHoursFromInterval(interval);
      const minutes = getMinutesFromInterval(interval);
      const date = new Date(
        new Date(new Date(day).setHours(hour)).setMinutes(minutes)
      );

      return { start: date, interval };
    }
  };

  const createEvent = (e, day) => {
    if (isInterval(e)) {
      const date = createDateFromAttr(e, day);

      date &&
        setCurrentEvent({
          start: date.start,
          intervals: [date.interval]
        });

      document.addEventListener('mousemove', modifyEvent);
      document.addEventListener('mouseup', resetCurrentEvent);
    }

    e.preventDefault();
  };

  const modifyEvent = e => {
    setIsResizable(isClickable(e));

    const { attributes } = e.target;
    const interval =
      attributes['data-date'] && attributes['data-date'].nodeValue;

    interval &&
      setCurrentEvent(event => {
        const { intervals } = event;
        const lastQuarter = parseInt(intervals[intervals.length - 1], 10);
        const secondToLastQuarter = parseInt(
          intervals[intervals.length - 2],
          10
        );
        const isGoingReverse =
          (lastQuarter > secondToLastQuarter &&
            parseInt(interval, 10) < lastQuarter) ||
          (lastQuarter < secondToLastQuarter &&
            parseInt(interval, 10) > lastQuarter);
        const updatedIntervals = intervals.includes(interval)
          ? isGoingReverse
            ? intervals.filter(quarter => parseInt(quarter, 10) !== lastQuarter)
            : intervals
          : intervals.filter(quarter => quarter !== interval).concat(interval);

        return { ...event, intervals: updatedIntervals };
      });

    e.preventDefault();
  };

  const checkForResizability = e => {
    const clickable = isClickable(e);

    clickable !== isResizable && setIsResizable(isClickable(e));
  };

  const resetCurrentEvent = e => {
    document.removeEventListener('mousemove', modifyEvent);
    document.removeEventListener('mouseup', resetCurrentEvent);

    setCurrentEvent({
      start: new Date(),
      intervals: []
    });

    e.preventDefault();
  };

  const resizeEvent = (e, event) => {
    if (isClickable(e)) {
      setCurrentEvent(event);

      document.addEventListener('mousemove', modifyEvent);
      document.addEventListener('mouseup', resetCurrentEvent);
    }
  };

  return {
    createEvent,
    resizeEvent,
    isResizable,
    currentEvent
  };
}

export default useEvent;
