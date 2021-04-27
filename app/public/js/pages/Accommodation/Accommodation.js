import React from 'react';
import PropTypes from 'prop-types';
import resolveAsset from '../../utils/resolve-asset';

const Accommodation = ({
  assetManifest,
}) => (
  <div className="page">
    <div
      className="cover-image"
      style={{
        backgroundImage: `url(/assets/${resolveAsset({ filename: 'bedroom-1.jpg', assetManifest })}`,
      }}
    >
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell">
            <h1 className="cover-image__heading">Accommodation</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="grid-container">
      <div className="grid-x">
        <div className="cell">
          <div className="page__main">
            <div className="page__section">
              <h2>Huntsham Court</h2>
              <p>
                There are enough rooms for a large number of our guests to stay on-site with us at{' '}
                <a rel="noopener noreferrer" target="_blank" href="https://www.huntshamcourt.co.uk">Huntsham Court</a>{' '}
                and we very much hope that you&apos;ll want to do that.
              </p>
              <p>
                The price is £50 per person per night and will be payable to us and due{' '}
                before 27th July 2021.
              </p>
              <p>
                The price includes all food and drink and anything else you need for a{' '}
                comfortable stay.
              </p>
            </div>
            <div className="page__section">
              <h2>Alternative Accommodation</h2>
              <p>
                If you are unable to stay at Hunstham Court with us then here are some{' '}
                nearby options that we recommend:
              </p>
              <ul className="accommodation-list">
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://gingerpeanut.co.uk/luxury-bedrooms/">The Ginger Peanut</a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.bridgehouse-bampton.co.uk/bed-and-breakfast/">Bridge House</a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.heronhousebampton.co.uk/">Heron House</a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.travelodge.co.uk/hotels/102/Tiverton-hotel">Travelodge</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="video-wrapper">
      <iframe
        width="560"
        height="349"
        src="https://www.youtube.com/embed/3m7bco2balM"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

Accommodation.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default Accommodation;
