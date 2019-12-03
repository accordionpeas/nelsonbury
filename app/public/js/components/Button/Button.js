import React from 'react';
import PropTypes from 'prop-types';
import ActivityIndicator from '../ActivityIndicator';

const Button = ({
  children,
  disabled,
  showActivityIndicator,
}) => (
  <button
    className="button"
    disabled={disabled}
  >
    <span>{children}</span>
    {showActivityIndicator && (
      <ActivityIndicator
        color="#fff"
        size="small"
      />
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  showActivityIndicator: PropTypes.bool,
};

export default Button;
