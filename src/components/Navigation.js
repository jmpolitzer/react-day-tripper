import React from 'react';

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

export default Navigation;
