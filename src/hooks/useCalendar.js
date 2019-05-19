import { useState } from 'react';
import {
  addMonths,
  addYears,
  addDays,
  addWeeks,
  addHours,
  addMinutes,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  startOfDay,
  subMonths,
  subYears,
  subDays,
  subWeeks,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear
} from 'date-fns';

function useCalendar(startWeekOn) {
  const [activeDate, setActiveDate] = useState(new Date());

  const setDate = date => {
    setActiveDate(date);
  };

  const fillInWeeks = month => {
    const firstDay = month[0];
    const lastDay = month[month.length - 1];
    const weekStart = startOfWeek(firstDay, { weekStartsOn: startWeekOn || 0 });
    const weekEnd = endOfWeek(lastDay);
    const frontFillIn = eachDayOfInterval({ start: weekStart, end: firstDay });
    const backFillIn = eachDayOfInterval({ start: lastDay, end: weekEnd });
    const lastMonthDays = frontFillIn.slice(0, frontFillIn.length - 1);
    const nextMonthDays = backFillIn.slice(1, backFillIn.length);

    return [...lastMonthDays, ...month, ...nextMonthDays];
  };

  const getDayHeaders = week => {
    return week.reduce((acc, d) => {
      acc.push({
        single: format(d.date, 'EEEEE'),
        short: format(d.date, 'EEEEEE'),
        medium: format(d.date, 'E'),
        long: format(d.date, 'EEEE')
      });

      return acc;
    }, []);
  };

  const getMonth = providedDate => {
    const dateToUse = providedDate || activeDate;
    const year = format(dateToUse, 'yyyy');
    const month = {
      index: dateToUse.getMonth(),
      stringName: format(dateToUse, 'MMMM')
    };
    const start = startOfMonth(dateToUse);
    const end = endOfMonth(dateToUse);
    const days = fillInWeeks(eachDayOfInterval({ start, end }));
    const formattedMonth = days.reduce((acc, day, i) => {
      const chunk = Math.floor(i / 7);

      if (!acc[chunk]) {
        acc[chunk] = [];
      }

      acc[chunk].push({ dayOfWeek: format(day, 'd'), date: day });

      return acc;
    }, []);

    const headers = getDayHeaders(formattedMonth[0]);

    return { headers, year, month, weeks: formattedMonth };
  };

  const getYear = () => {
    const year = parseInt(format(activeDate, 'yyyy'));
    const months = [...Array(12)].map((_, i) => getMonth(new Date(year, i, 1)));
    const quarters = months.reduce((acc, month, i) => {
      const chunk = Math.floor(i / 3);

      if (!acc[chunk]) {
        acc[chunk] = [];
      }

      acc[chunk].push(month);

      return acc;
    }, []);

    return { year, quarters };
  };

  const getDay = date => {
    const dateToUse = date || activeDate;
    const dayString = format(dateToUse, 'EEEE');
    const dayOfWeek = format(dateToUse, 'd');
    const month = format(dateToUse, 'MMMM');
    const year = format(dateToUse, 'yyyy');
    const dayStart = startOfDay(dateToUse);
    const day = [...Array(24)].map((_, i) => {
      const hour = addHours(dayStart, i);

      return [...Array(4)].map((_, j) => addMinutes(hour, j * 15));
    });

    return { dayOfWeek, dayString, month, year, date: dateToUse, day };
  };

  const getWeek = () => {
    const weekStart = startOfWeek(activeDate, {
      weekStartsOn: startWeekOn || 0
    });
    const week = [...Array(7)].map((_, i) => getDay(addDays(weekStart, i)));
    const headers = getDayHeaders(week);

    return { headers, week };
  };

  const goToNextMonth = () => {
    setActiveDate(addMonths(startOfMonth(activeDate), 1));
  };

  const goToPreviousMonth = () => {
    setActiveDate(subMonths(startOfMonth(activeDate), 1));
  };

  const goToNextYear = () => {
    setActiveDate(addYears(startOfMonth(activeDate), 1));
  };

  const goToPreviousYear = () => {
    setActiveDate(subYears(startOfMonth(activeDate), 1));
  };

  const goToNextDay = () => {
    setActiveDate(addDays(activeDate, 1));
  };

  const goToPreviousDay = () => {
    setActiveDate(subDays(activeDate, 1));
  };

  const goToNextWeek = () => {
    setActiveDate(addWeeks(activeDate, 1));
  };

  const goToPreviousWeek = () => {
    setActiveDate(subWeeks(activeDate, 1));
  };

  const getEventsForDay = events => {
    return events.reduce((acc, event) => {
      isSameDay(event.start, activeDate) && acc.push(event);

      return acc;
    }, []);
  };

  const getEventsForWeek = events => {
    return events.reduce((acc, event) => {
      isSameWeek(event.start, activeDate) && acc.push(event);

      return acc;
    }, []);
  };

  const getEventsForMonth = events => {
    return events.reduce((acc, event) => {
      isSameMonth(event.start, activeDate) && acc.push(event);

      return acc;
    }, []);
  };

  const getEventsForYear = events => {
    return events.reduce((acc, event) => {
      isSameYear(event.start, activeDate) && acc.push(event);

      return acc;
    }, []);
  };

  return {
    activeDate,
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear,
    getDay,
    goToNextDay,
    goToPreviousDay,
    getWeek,
    goToNextWeek,
    goToPreviousWeek,
    getEventsForDay,
    getEventsForWeek,
    getEventsForMonth,
    getEventsForYear
  };
}

export default useCalendar;
