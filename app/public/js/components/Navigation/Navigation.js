import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavigationItem from './NavigationItem';
import isServer from '../../utils/is-server';

const generateNavigationClassNames = ({ isOpen }) => (
  classNames(
    'navigation',
    {
      'navigation--is-open': isOpen,
      'navigation--has-transition': !isServer,
    },
  )
);

const Navigation = ({
  isOpen,
}) => (
  <nav className={generateNavigationClassNames({ isOpen })}>
    <div className="grid-container">
      <div className="grid-x align-center navigation__list-container">
        <ul className="navigation__list flex-container">
          <NavigationItem to="/lineup">Lineup</NavigationItem>
          <NavigationItem to="/travel">Travel</NavigationItem>
          <NavigationItem to="/accommodation">Accommodation</NavigationItem>
          <NavigationItem to="/photos">Photos</NavigationItem>
          <NavigationItem to="/gifts">Gifts</NavigationItem>
          {/* <NavigationItem to="/rsvp">RSVP</NavigationItem> */}
        </ul>
      </div>
    </div>
  </nav>
);

Navigation.propTypes = {
  isOpen: PropTypes.bool,
};

export default Navigation;
