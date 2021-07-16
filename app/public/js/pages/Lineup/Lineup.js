import React from 'react';
import PropTypes from 'prop-types';
import resolveAsset from '../../utils/resolve-asset';

const LineUp = ({
  assetManifest,
}) => (
  <div className="page">
    <div
      className="cover-image"
      style={{
        backgroundImage: `url(/assets/${resolveAsset({ filename: 'huntsham-1.jpg', assetManifest })}`,
      }}
    >
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell">
            <h1 className="cover-image__heading">Lineup</h1>
            <p className="cover-image__paragraph">
              Welcome to our 2 day wedding. We will be spending 2nd-4th August 2021 at{' '}
              <a className="cover-image__link" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/7LPbnWnNvyHWnFoEA">Huntsham Court</a>.{' '}
              We have room for a large number of guests to stay onsite and would love for{' '}
              you to join us.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="page__main">
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell text-align-center">
            <div className="page__section">
              <h2>Garden party - Monday 2nd August</h2>
              <ul>
                <li>Check-in to <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/7LPbnWnNvyHWnFoEA">Huntsham Court</a> from 5pm</li>
                <li>Drinks from 6pm</li>
                <li>Food served from 7pm - 10pm</li>
              </ul>
            </div>
            <div className="page__section">
              <h2>The Big Day - Tuesday 3rd August</h2>
              <ul>
                <li>Breakfast from 8.30am - 10.30am</li>
                <li>Ceremony at <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/sPzxJbt5MutYLV9b7">St. George&apos;s Church</a> 1pm</li>
                <li>Reception from 3pm</li>
              </ul>
            </div>
            <div className="page__section">
              <h2>Wednesday 4th August</h2>
              <ul>
                <li>Breakfast from 8.00am - 10.00am</li>
                <li>Check-out of Huntsham Court at 10am</li>
                <li>Lunch at <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/NQiuXGQpXZw1kDsF7">Hartnoll Hotel</a> at 1pm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

LineUp.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default LineUp;
