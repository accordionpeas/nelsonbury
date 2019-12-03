import { connect } from 'react-redux';
import * as R from 'ramda';
import Component from './RSVP';
import { send, addGuest, removeGuest } from '../../state/modules/rsvp';

export const mapStateToProps = ({ rsvp }) => ({
  isFetchingRSVP: R.prop('isFetchingRSVP', rsvp),
  didRSVPSucceed: R.prop('didRSVPSucceed', rsvp),
  didRSVPFail: R.prop('didRSVPFail', rsvp),
  noOfGuests: R.prop('noOfGuests', rsvp),
});

export const mapDispatchToProps = dispatch => ({
  send: props => dispatch(send(props)),
  addGuest: props => dispatch(addGuest(props)),
  removeGuest: props => dispatch(removeGuest(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
