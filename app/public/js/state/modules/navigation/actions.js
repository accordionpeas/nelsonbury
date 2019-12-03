import createActionHelper from '../../../utils/state/create-action';

const createAction = createActionHelper('navigation');

// eslint-disable-next-line import/prefer-default-export
export const toggle = createAction('toggle');
