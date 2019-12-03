import { Router } from 'express';
import * as R from 'ramda';

const ssrRouter = ({
  routes,
  ssr,
}) => {
  const router = Router();

  routes.forEach(({
    path,
    middleware,
    ...rest
  }) => {
    const handler = (req, res, next) => {
      req.route = rest;
      ssr(req, res, next);
    };

    const allMiddleware = R.compose(
      R.map(({ express }) => express),
      R.defaultTo([]),
    )(middleware);

    const args = [
      path,
      ...allMiddleware,
      handler,
    ];

    router.get(...args);
  });

  return router;
};

export default ssrRouter;
