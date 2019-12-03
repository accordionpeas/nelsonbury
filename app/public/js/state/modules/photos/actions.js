import createActionHelper from '../../../utils/state/create-action';

const createAction = createActionHelper('photos');

export const isFetching = createAction('is-fetching');
export const didSucceed = createAction('did-succeed');
export const didFail = createAction('did-fail');
