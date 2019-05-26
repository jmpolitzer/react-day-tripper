import React from 'react';
import PropTypes from 'prop-types';

function Navigation(props) {
  const { previous, next, title, changeView } = props;
  const goToCurrentDay = () => changeView('day', new Date());

  return (
    <div className='nav'>
      <button onClick={previous}>&laquo;</button>
      {title}
      <button onClick={goToCurrentDay}>@</button>
      <button onClick={next}>&raquo;</button>
    </div>
  );
}

Navigation.propTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  title: PropTypes.element,
  changeView: PropTypes.func
};

export default Navigation;
