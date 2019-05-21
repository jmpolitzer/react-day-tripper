import React, { useState, useEffect } from 'react';
import { getFormattedTime } from '../helpers';

function CurrentTime(props) {
  const { isMilitary } = props;
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const time = getFormattedTime(now, isMilitary);

      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div className='current-time current'>{currentTime}</div>;
}

export default CurrentTime;
