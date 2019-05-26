/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { navStyle, buttonStyle } from './styles';

function Navigation(props) {
  const { previous, next, title, changeView } = props;
  const goToCurrentDay = () => changeView('day', new Date());

  return (
    <div css={navStyle}>
      <button css={buttonStyle} onClick={previous}>
        &laquo;
      </button>
      {title}
      <button css={buttonStyle} onClick={goToCurrentDay}>
        @
      </button>
      <button css={buttonStyle} onClick={next}>
        &raquo;
      </button>
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
