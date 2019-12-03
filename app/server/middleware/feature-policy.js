import helmet from 'helmet';

export default () => (
  helmet.featurePolicy({
    features: {
      fullscreen: ["'none'"],
      payment: ["'none'"],
      syncXhr: ["'none'"],
    },
  })
);
