import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const generateHamburgerClassNames = ({ isOpen }) => (
  classNames(
    'hamburger',
    'hide-for-xlarge',
    {
      'hamburger--is-open': isOpen,
    },
  )
);

const Hamburger = ({
  isOpen,
  toggle,
}) => (
  <button
    className={generateHamburgerClassNames({ isOpen })}
    onClick={toggle}
  >
    <div className="hamburger__line" />
    <div className="hamburger__line" />
    <div className="hamburger__line" />

    <div className="hamburger__cross hamburger__cross--one" />
    <div className="hamburger__cross hamburger__cross--two" />

    <span className="show-for-sr">Open navigation</span>
  </button>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default Hamburger;
