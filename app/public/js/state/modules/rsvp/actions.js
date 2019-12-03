import createActionHelper from '../../../utils/state/create-action';

const createAction = createActionHelper('rsvp');

// eslint-disable-next-line import/prefer-default-export
export const addGuest = createAction('add-guest');
export const removeGuest = createAction('remove-guest');
