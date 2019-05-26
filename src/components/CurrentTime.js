/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFormattedTime } from '../helpers';
import { currentTimeStyle, currentStyle } from './styles';

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

  return (
    <div css={{ ...currentTimeStyle, ...currentStyle }}>{currentTime}</div>
  );
}

CurrentTime.propTypes = {
  isMilitary: PropTypes.bool.isRequired
};

export default CurrentTime;
