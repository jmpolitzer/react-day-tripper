import React from 'react';

function Navigation(props) {
  const { previous, next, title } = props;

  return (
    <div className='nav'>
      <button onClick={previous}>&laquo;</button>
      {title}
      <button onClick={next}>&raquo;</button>
    </div>
  );
}

export default Navigation;
