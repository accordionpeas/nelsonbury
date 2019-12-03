/* eslint-disable global-require */
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import compression from 'compression';
import featurePolicyMiddleware from './middleware/feature-policy';
import referrerPolicyMiddleware from './middleware/referrer-policy';
import staticMiddleware from './middleware/static';
import gracefulShutdown from './utils/graceful-shutdown';
import config from './conf';

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('unhandled rejection exiting process.');
  process.exit(1);
});

const app = express();
const server = createServer(app);

const { env } = process;

(async () => {
  await config();

  // Require here so that env vars are loaded before code runs
  const router = require('./router').default;
  const errorController = require('./controllers/error').default;

  app
    .use(helmet())
    .use(featurePolicyMiddleware())
    .use(referrerPolicyMiddleware())
    .use(compression())
    .use(staticMiddleware())
    .use(cookieParser())
    .use(bodyParser.json({ limit: '50mb' }))
    .use(router)
    // ensure this is last
    .use(errorController);

  server.listen(env.PORT, () => {
    console.log(`server running on ${server.address().port}`);
    if (process.send) {
      process.send('ready');
    }
  });
})();

gracefulShutdown({
  server,
});
