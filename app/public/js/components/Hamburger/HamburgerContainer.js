import { connect } from 'react-redux';
import * as R from 'ramda';
import Component from './Hamburger';
import { toggle } from '../../state/modules/navigation';

export const mapStateToProps = ({ navigation }) => ({
  isOpen: R.prop('isOpen', navigation),
});

export const mapDispatchToProps = dispatch => ({
  toggle: props => dispatch(toggle(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
