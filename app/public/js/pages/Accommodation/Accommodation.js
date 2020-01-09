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
                number of children. Priority will be given to those under 2 years old.{' '}
                Therefore, if you need to bring your children please let us know when you{' '}
                RSVP and we will try our best to accommodate them.
              </p>
              <p>
                Please note that according to Huntsham Court rules, children aged over 2{' '}
                require their own bed and therefore you may find it cheaper to stay in nearby{' '}
                accommodation or Airbnb.
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
                  <br/><br/>
                  We have booked out all 5 rooms at the Ginger Peanut so contact us if you{' '}
                  want to book one of the rooms.
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.bridgehouse-bampton.co.uk/bed-and-breakfast/">Bridge House</a>
                  <br/><br/>
                  We have booked out all 3 rooms at the Bridge House so contact us if you{' '}
                  want to book one of the rooms.
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.heronhousebampton.co.uk/">Heron House</a>
                  <br/><br/>
                  Book directly online if you want a room here.
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.travelodge.co.uk/hotels/102/Tiverton-hotel">Travelodge</a>
                  <br/><br/>
                  Book directly online if you want a room here.
                </li>
              </ul>
              <p>
                Guests who are not staying at Huntsham Court are responsible for making their own way to the Church and wedding reception.{' '}
                Parking is available at both venues.
              </p>
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
