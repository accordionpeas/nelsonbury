import { Router } from 'express';
import { throwError } from '../../utils/errors';
import recaptchaMiddleware from '../../middleware/recaptcha';
import rsvp from '../../controllers/service/rsvp';

const recaptcha = recaptchaMiddleware({ secret: process.env.WEB_RECAPTCHA_SECRET_KEY });

const router = Router();

export default router

  .post('/rsvp', recaptcha, rsvp)

  .use('*', (req) => {
    throwError({ status: 404, message: `Unmatched route ${req.originalUrl}` });
  });
