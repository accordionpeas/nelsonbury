import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';

const activityIndicatorClassNames = bem('activity-indicator');

const generateLoaderClassNames = ({ size }) => (
  activityIndicatorClassNames('loader', {
    modifiers: {
      [size]: size,
    },
  })
);

const getStyle = ({ color }) => ({
  ...color && { borderColor: `${color} transparent transparent transparent` },
});

const ActivityIndicator = ({
  size = 'large',
  color,
}) => (
  <div className={activityIndicatorClassNames('', {})}>
    <div className={generateLoaderClassNames({ size })}>
      <div style={getStyle({ color })}></div>
      <div style={getStyle({ color })}></div>
      <div style={getStyle({ color })}></div>
      <div style={getStyle({ color })}></div>
    </div>
  </div>
);

ActivityIndicator.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.string,
};

export default ActivityIndicator;
