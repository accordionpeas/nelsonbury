import common from './common';

export default async req => ({
  ...common(req),
  reCaptcha: {
    siteKey: process.env.WEB_RECAPTCHA_SITE_KEY,
  },
});
