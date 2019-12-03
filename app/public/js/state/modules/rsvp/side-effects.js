import * as R from 'ramda';
import fetchHelper from '../../../utils/state/fetch';

const namespace = 'rsvp';

const getRecaptchaValue = async ({ data, getState }) => {
  const state = getState();
  const reCaptchaSiteKey = R.path(['reCaptcha', 'siteKey'], state);
  const reCaptchaValue = await grecaptcha.execute(reCaptchaSiteKey);
  return {
    ...data,
    'recaptcha-value': reCaptchaValue,
  };
};

export const {
  sideEffect: send,
  reducers: sendReducers,
} = fetchHelper({
  namespace,
  name: 'RSVP',
  url: '/service/rsvp',
  method: 'POST',
  transformData: getRecaptchaValue,
});
