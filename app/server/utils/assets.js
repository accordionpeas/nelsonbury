import resolveAsset from '../../public/js/utils/resolve-asset';
import assetManifest from '../../../build/asset-manifest.json';

export default {
  css: [
    'https://fonts.googleapis.com/css?family=Raleway&display=swap',
    `/${resolveAsset({ filename: 'app.min.css', assetManifest })}`,
  ],
  js: [
    'https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,Array.from,Array.prototype.find',
    `/${resolveAsset({ filename: 'index.js', assetManifest })}`,
  ],
  favicon: `/assets/${resolveAsset({ filename: 'favicon.png', assetManifest })}`,
};
