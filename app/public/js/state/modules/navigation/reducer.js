import { handleActions } from 'redux-actions';
import {
  toggle as toggleAction,
} from './actions';

const defaultState = {};

const toggle = state => ({
  isOpen: !state.isOpen,
});

export default handleActions(
  new Map([
    [toggleAction, toggle],
  ]),
  defaultState,
);
