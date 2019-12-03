import Recaptcha from 'recaptcha-verify';
import * as R from 'ramda';
import { getError } from '../utils/errors';

const verify = ({ recaptcha, userResponse }) => (
  new Promise((resolve) => {
    recaptcha.checkResponse(userResponse, (err, response) => {
      if (err || !response.success) {
        resolve({ ok: false, response });
      } else {
        resolve({ ok: true, response });
      }
    });
  })
);

export default ({ secret }) => {
  const recaptcha = new Recaptcha({ secret });

  return async (req, res, next) => {
    const userResponse = R.pathOr('', ['body', 'recaptcha-value'], req);
    const verifyResponse = await verify({ recaptcha, userResponse });

    if (verifyResponse.ok) {
      next();
    } else {
      next(getError({
        status: 403,
        message: 'ReCaptcha not verified',
        data: verifyResponse,
      }));
    }
  };
};
