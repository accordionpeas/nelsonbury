import { connect } from 'react-redux';
import Component from './Footer';

export const mapStateToProps = ({ assetManifest }) => ({
  assetManifest,
});

export default connect(
  mapStateToProps,
)(Component);
