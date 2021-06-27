/* eslint-disable global-require */
import safeImport from './utils/safe-import';
import Home from './pages/Home';
import Lineup from './pages/Lineup';
import Photos from './pages/Photos';
import Gifts from './pages/Gifts';
import Accommodation from './pages/Accommodation';
import NotFound from './pages/NotFound';
import Travel from './pages/Travel';
import Music from './pages/Music';
import RSVP from './pages/RSVP';

const title = 'Nelsonbury Wedding Festival';
const description = 'Nelsonbury Wedding Festival';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/home').default),
  },
  {
    path: '/lineup',
    component: Lineup,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/lineup').default),
  },
  {
    path: '/travel',
    component: Travel,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/travel').default),
  },
  {
    path: '/photos',
    component: Photos,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/photos').default),
  },
  {
    path: '/gifts',
    component: Gifts,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/gifts').default),
  },
  {
    path: '/accommodation',
    component: Accommodation,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/accommodation').default),
  },
  {
    path: '/music',
    component: Music,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/music').default),
  },
  {
    path: '/rsvp',
    component: RSVP,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/rsvp').default),
    assets: {
      js: [
        `https://www.google.com/recaptcha/api.js?render=${process.env.WEB_RECAPTCHA_SITE_KEY}`,
      ],
    },
  },
  {
    path: '*',
    component: NotFound,
    title,
    description,
    hydrate: safeImport(() => require('../../server/hydrate/not-found').default),
  },
];
