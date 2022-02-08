import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Axx = ({ text, c1, subT, flag, ar = [] }) => {
  return (<div style={{ color: c1 }}>{text}
    {flag && <p>
      {subT}
    </p>}
    {
      ar.map(e => <span>{e} </span>)
    }
  </div >
  );
};

Axx.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  text: PropTypes.string,
  /**
   * What background color to use
   */
  c1: PropTypes.string,
  // /**
  //  * How large should the button be?
  //  */
  subT: PropTypes.oneOf(['small', 'medium', 'large']),
  // /**
  //  * Button contents
  //  */
  // label: PropTypes.string.isRequired,
  flag: PropTypes.bool,
  ar: PropTypes.array,
  obj: { "a": 2 }
  // /**
  //  * Optional click handler
  //  */
  // onClick: PropTypes.func,
};

