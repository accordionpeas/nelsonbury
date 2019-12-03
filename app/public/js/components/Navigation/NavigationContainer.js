import { connect } from 'react-redux';
import * as R from 'ramda';
import Component from './Navigation';

export const mapStateToProps = ({ navigation }) => ({
  isOpen: R.prop('isOpen', navigation),
});

export default connect(
  mapStateToProps,
)(Component);
