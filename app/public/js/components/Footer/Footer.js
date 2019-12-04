import React from 'react';
import PropTypes from 'prop-types';
import resolveAsset from '../../utils/resolve-asset';

const Footer = ({
  assetManifest,
}) => (
  <footer className="footer">
    <img
      className="footer__image"
      src={`/assets/${resolveAsset({ filename: 'footer.png', assetManifest })}`}
    />
  </footer>
);

Footer.propTypes = {
  assetManifest: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
