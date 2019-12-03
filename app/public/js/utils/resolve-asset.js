import * as R from 'ramda';

export default ({ filename, assetManifest }) => R.propOr(filename, filename, assetManifest);
