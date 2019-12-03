import { connect } from 'react-redux';
import Component from './Home';

export const mapStateToProps = ({ assetManifest }) => ({
  assetManifest,
});

export default connect(
  mapStateToProps,
)(Component);
