import { Router } from 'express';
import 'express-async-errors';
import { throwError } from '../utils/errors';
import ssr from '../controllers/ssr';
import serviceRouter from './service';
import ssrRouter from '../utils/ssr-router';
import routes from '../../public/js/routes';

const router = Router();

export default router
  // match any file
  .use(/.*\..*/, (req) => {
    throwError({ status: 404, message: `Unmatched route ${req.originalUrl}` });
  })

  .get('/health', (req, res) => {
    res.send('HEALTHY');
  })

  .use('/service', serviceRouter)

  .use(ssrRouter({ routes, ssr }));
