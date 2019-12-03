import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const generateListItemClassNames = ({ isSelected, subnav }) => (
  classNames(
    'navigation__list-item',
    {
      'navigation__list-item--is-selected': isSelected,
      'navigation__list-item--is-subnav': subnav,
    },
  )
);

const generateLinkClassNames = ({ isSelected, subnav }) => (
  classNames(
    'navigation__link',
    {
      'navigation__link--is-selected': isSelected,
      'navigation__link--is-subnav': subnav,
    },
  )
);

const getIsSelected = ({
  location,
  to,
  otherRoutes = [],
}) => {
  const currentRoute = R.compose(
    R.prop(1),
    R.split('/'),
    R.propOr('', 'pathname'),
  )(location);

  const isCurrent = to.substr(1) === currentRoute;
  const isOtherRoute = otherRoutes.find(route => route === currentRoute);

  return isCurrent || isOtherRoute;
};

const NavigationItem = ({
  location,
  to,
  children,
  otherRoutes,
  subnav,
}) => {
  const isSelected = getIsSelected({ location, to, otherRoutes });

  return (
    <li className={generateListItemClassNames({ isSelected, subnav })}>
      <a
        className={generateLinkClassNames({ isSelected, subnav })}
        href={to}
      >
        {children}
      </a>
    </li>
  );
};

NavigationItem.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  otherRoutes: PropTypes.arrayOf(PropTypes.string),
  subnav: PropTypes.bool,
};

export default withRouter(NavigationItem);
