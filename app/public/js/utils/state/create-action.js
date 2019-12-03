import { createAction as createActionModule } from 'redux-actions';
import * as R from 'ramda';

const createAction = (namespace, name) => (
  createActionModule(`nelsonbury/${namespace}/${name}`)
);

export default R.curry(createAction);
