import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import {
  addGuest as addGuestAction,
  removeGuest as removeGuestAction,
} from './actions';
import {
  sendReducers,
} from './side-effects';

const defaultState = {
  noOfGuests: 1,
};

const addGuest = state => ({
  ...state,
  noOfGuests: R.compose(
    R.inc,
    R.prop('noOfGuests'),
  )(state),
});

const removeGuest = state => ({
  ...state,
  noOfGuests: R.compose(
    R.dec,
    R.prop('noOfGuests'),
  )(state),
});

export default handleActions(
  new Map([
    [addGuestAction, addGuest],
    [removeGuestAction, removeGuest],
    ...sendReducers,
  ]),
  defaultState,
);
