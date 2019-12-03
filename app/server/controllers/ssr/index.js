import * as R from 'ramda';
import renderFullPage from '../../utils/render-full-page';
import { getError } from '../../utils/errors';
import App from '../../../public/js/App';
import createStore from '../../../public/js/state/store';
import assets from '../../utils/assets';

const noop = async () => {};

export default async (req, res, next) => {
  try {
    const { url } = req;
    const hydrate = R.pathOr(noop, ['route', 'hydrate'], req);
    const title = R.pathOr('', ['route', 'title'], req);
    const routeAssets = R.pathOr('', ['route', 'assets'], req);
    const routeDescription = R.path(['route', 'description'], req);

    const preloadedState = await hydrate(req);

    const html = renderFullPage({
      url,
      title,
      description: routeDescription,
      App,
      createStore,
      preloadedState,
      assets,
      routeAssets,
    });

    res.set('Content-Type', 'text/html');
    res.write(html);
    res.end();
  } catch (err) {
    console.log('Error caught in SSR.', err);
    next(getError({ status: 500, message: 'Error in ssr' }));
  }
};
