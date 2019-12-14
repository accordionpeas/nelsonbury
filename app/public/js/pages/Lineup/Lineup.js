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
              Welcome to our 3 day wedding festival. We will be spending the weekend of 1st-4th May 2020 at{' '}
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
              <h2>Welcome party - Friday 1st</h2>
              <ul>
                <li>Check-in to <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/7LPbnWnNvyHWnFoEA">Huntsham Court</a> from 5pm</li>
                <li>Dinner served from 7pm - 10pm</li>
                <li>Pub quiz from 8pm</li>
              </ul>
            </div>
            <div className="page__section">
              <h2>The Big Day - Saturday 2nd</h2>
              <ul>
                <li>Breakfast from 9am - 11am</li>
                <li>Ceremony at <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/sPzxJbt5MutYLV9b7">St. George&apos;s Church</a> 1pm</li>
                <li>Reception from 3pm</li>
              </ul>
            </div>
            <div className="page__section">
              <h2>After party - Sunday 3rd</h2>
              <ul>
                <li>Breakfast from 10am - 12pm</li>
                <li>Garden party from 12pm</li>
                <li>BBQ from 4pm</li>
                <li>After party DJ sets from 7pm</li>
              </ul>
            </div>
            <div className="page__section">
              <h2>Monday 4th</h2>
              <ul>
                <li>Check-out of Huntsham Court at 10am</li>
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
