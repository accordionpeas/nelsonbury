import { connect } from 'react-redux';
import Component from './Header';

export const mapStateToProps = ({ assetManifest }) => ({
  assetManifest,
});

export default connect(
  mapStateToProps,
)(Component);
