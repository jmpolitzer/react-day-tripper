import React, { useState, useEffect } from 'react';
import { getEveningStatus, getIntervalHourOrMinutes } from '../helpers';

function CurrentTime(props) {
  const { isMilitary } = props;
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const isEvening = getEveningStatus(now, true, isMilitary);
      const time = `${getIntervalHourOrMinutes(
        now,
        0,
        isMilitary
      )}:${getIntervalHourOrMinutes(now, 1, isMilitary)}${
        isEvening ? 'p' : ''
      }`;

      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div className='current-time current'>{currentTime}</div>;
}

export default CurrentTime;
