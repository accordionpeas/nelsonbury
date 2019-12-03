import helmet from 'helmet';

export default () => (
  helmet.referrerPolicy({ policy: 'same-origin' })
);
