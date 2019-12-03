import React from 'react';
import PropTypes from 'prop-types';
import resolveAsset from '../../utils/resolve-asset';

const Home = ({
  assetManifest,
}) => (
  <div className="page">
    <picture>
      <source
        media="(min-width:1024px)"
        srcSet={`/assets/${resolveAsset({ filename: 'carol-and-michael-large.jpg', assetManifest })}`}
      />
      <img
        className="home__photo"
        src={`/assets/${resolveAsset({ filename: 'carol-and-michael-small.jpg', assetManifest })}`}
      />
    </picture>
    <div className="page__main">
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell text-align-center">
            <h1 className="no-margin">
              Welcome to 2020&apos;s biggest and best weekend-long party held in the southwest{' '}
              of England. Forget Glastonbury, get ready for Nelsonbury Festival.
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Home.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default Home;
