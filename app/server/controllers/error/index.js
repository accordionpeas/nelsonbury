import App from '../../../public/js/App';
import createStore from '../../../public/js/state/store';
import assets from '../../utils/assets';
import errorHydrate from '../../hydrate/error';
import renderFullPage from '../../utils/render-full-page';
import { parseError } from '../../utils/errors';

const description = 'Server Error';

// Ensure there are always 4 params here otherwise
// this error handler will not be called
// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
  const {
    status,
    message,
    data,
    stack,
  } = parseError(err);

  console.log('Error controller', { status, message, stack });

  const preloadedState = await errorHydrate(req);

  res.status(status);
  res.removeHeader('Cache-Control');
  res.removeHeader('Surrogate-Control');

  if (req.get('Accept') === 'application/json') {
    res.send(data);
  } else {
    const html = renderFullPage({
      url: req.url,
      description,
      App,
      createStore,
      preloadedState,
      assets,
    });

    // catch this in case we're streaming the response
    // and we can't set headers at this point
    try {
      res.set('Content-Type', 'text/html');
    // eslint-disable-next-line no-empty
    } catch (error) {}

    res.write(html);
    res.end();
  }
};
