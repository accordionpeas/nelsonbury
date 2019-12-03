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
                before 24th April 2020.
              </p>
              <p>
                Priority will be given to immediate family and the wedding party.
              </p>
              <p>
                The price includes all food and drink and anything else you need for a{' '}
                comfortable stay.
              </p>

              <h3>Children</h3>
              <p>
                Owing to limited space, Huntsham Court is only able to accommodate a small{' '}
                number of children. Priority will be given to those aged 2 and under.{' '}
                Therefore, if you need to bring your children please let us know when you{' '}
                RSVP and we will try our best to accommodate them.
              </p>
            </div>
            <div className="page__section">
              <h2>Alternative Accommodation</h2>
              <p>
                If you are unable to stay at Hunstham Court with us then here are some{' '}
                nearby options that we recommend:
              </p>
              <ul>
                <li><a target="_blank" rel="noopener noreferrer" href="https://gingerpeanut.co.uk/">The Ginger Peanut</a> (Bampton, 4m)</li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://oldbridwell.co.uk/">Bolham House</a> (Tiverton 6m)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="cover-image"
      style={{
        backgroundImage: `url(/assets/${resolveAsset({ filename: 'bedroom-2.jpg', assetManifest })}`,
      }}
    />
  </div>
);

Accommodation.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default Accommodation;
