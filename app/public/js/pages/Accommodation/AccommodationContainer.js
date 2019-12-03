import { connect } from 'react-redux';
import Component from './Accommodation';

export const mapStateToProps = ({ assetManifest }) => ({
  assetManifest,
});

export default connect(
  mapStateToProps,
)(Component);
