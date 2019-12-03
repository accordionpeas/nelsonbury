import { handleActions } from 'redux-actions';
import {
  isFetching as isFetchingAction,
  didSucceed as didSucceedAction,
  didFail as didFailAction,
} from './actions';

const defaultState = {
  photos: [],
  endCursor: null,
  isFetching: false,
};

const isFetching = state => ({
  ...state,
  isFetching: true,
});

const didSucceed = (state, { payload }) => ({
  ...state,
  photos: [...state.photos, ...payload.photos],
  endCursor: payload.endCursor,
  isFetching: false,
});

const didFail = state => ({
  ...state,
  isFetching: false,
});

export default handleActions(
  new Map([
    [isFetchingAction, isFetching],
    [didSucceedAction, didSucceed],
    [didFailAction, didFail],
  ]),
  defaultState,
);
