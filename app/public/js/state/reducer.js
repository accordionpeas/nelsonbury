import { combineReducers } from 'redux';
import rsvpReducer from './modules/rsvp';
import navigationReducer from './modules/navigation';
import photosReducer from './modules/photos';

const defaultReducer = (state = {}) => state;

const rootReducer = combineReducers({
  assetManifest: defaultReducer,
  reCaptcha: defaultReducer,
  rsvp: rsvpReducer,
  navigation: navigationReducer,
  photos: photosReducer,
});

export default rootReducer;
