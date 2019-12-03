import { connect } from 'react-redux';
import Component from './Lineup';

export const mapStateToProps = ({ assetManifest }) => ({
  assetManifest,
});

export default connect(
  mapStateToProps,
)(Component);
