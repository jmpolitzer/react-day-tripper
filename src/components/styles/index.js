const eventStyle = (isResizable, isDescending) => ({
  position: 'absolute',
  ...(isResizable && {
    cursor: 'ns-resize'
  }),
  ...(isDescending && {
    transform: 'rotate(180deg)',
    transformOrigin: '50% 23px'
  })
});

const eventIntervalStyle = isDescending => ({
  backgroundColor: 'teal',
  height: '45px',
  ...(isDescending && {
    transform: 'rotate(180deg)'
  })
});

const currentTimeStyle = {
  fontSize: '14px'
};

const currentStyle = {
  color: 'blue'
};

const dayHeadersStyle = {
  div: {
    marginRight: '3px'
  }
};

const clickableStyle = {
  ':hover': {
    cursor: 'pointer',
    color: 'red'
  }
};

const quarterLineStyle = {
  width: '200px',
  height: '1px',
  background: 'black'
};

const dayIntervalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '45px'
};

const hourStyle = {
  fontWeight: 'bold',
  fontSize: '24px'
};

const timeLabelStyle = {
  display: 'flex',
  alignItems: 'center'
};

const eveningLabelStyle = {
  fontSize: '14px',
  fontWeight: 'normal',
  marginLeft: '2px'
};

const monthSquareStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  width: '50px'
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const weekDayRangeStyle = {
  margin: '0px 5px'
};

const weekDayStyle = {
  marginRight: '10px'
};

const weekDayHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const displayFlexStyle = {
  display: 'flex'
};

const fontWeightBoldStyle = {
  fontWeight: 'bold'
};

const buttonStyle = {
  height: '30px'
};

export {
  eventStyle,
  eventIntervalStyle,
  currentTimeStyle,
  currentStyle,
  displayFlexStyle,
  dayHeadersStyle,
  clickableStyle,
  quarterLineStyle,
  dayIntervalStyle,
  hourStyle,
  timeLabelStyle,
  eveningLabelStyle,
  fontWeightBoldStyle,
  monthSquareStyle,
  navStyle,
  weekDayRangeStyle,
  weekDayStyle,
  weekDayHeaderStyle,
  buttonStyle
};
