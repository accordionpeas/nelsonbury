import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Hamburger from '../Hamburger';
import resolveAsset from '../../utils/resolve-asset';

const Header = ({
  assetManifest,
}) => (
  <header className="header">
    <div className="header__curve"></div>

    <div
      className="header__light header__white-light"
      style={{
        top: 138,
        right: 10,
      }}
    />

    <div
      className="header__light header__yellow-light"
      style={{
        top: 120,
        right: 30,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 122,
        right: 60,
      }}
    />

    <div
      className="header__light header__white-light"
      style={{
        top: 130,
        right: 90,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 120,
        right: 120,
      }}
    />

     <div
      className="header__light header__pink-light"
      style={{
        top: 125,
        right: 160,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 95,
        right: 170,
      }}
    />

    <div
      className="header__light header__yellow-light"
      style={{
        top: 75,
        right: 190,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 90,
        right: 220,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 90,
        right: 250,
      }}
    />

    <div
      className="header__light header__pink-light"
      style={{
        top: 60,
        right: 270,
      }}
    />

    <div
      className="header__light header__gold-light"
      style={{
        top: 50,
        right: 300,
      }}
    />

    <div
      className="header__light header__white-light"
      style={{
        top: 45,
        right: 340,
      }}
    />

    <div
      className="header__light header__yellow-light"
      style={{
        top: 30,
        right: 370,
      }}
    />

    <div
      className="header__light header__pink-light"
      style={{
        top: 5,
        right: 385,
      }}
    />

    <div className="grid-container">
      <div className="grid-x align-center align-middle header__home-link-container">
        <a className="cell shrink header__home-link" href="/">
          <img
            className="header__logo"
            src={`/assets/${resolveAsset({ filename: 'logo.png', assetManifest })}`}
            alt="Carol &amp; Michael"
          />
        </a>
        <div className="cell shrink">
          <Hamburger />
        </div>
      </div>
    </div>
    <Navigation />
  </header>
);

Header.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default Header;
