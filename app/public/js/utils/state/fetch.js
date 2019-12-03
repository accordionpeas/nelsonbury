import * as R from 'ramda';
import fetchUtil from '../fetch';
import createAction from './create-action';

const noop = () => {};

export const fetch = ({
  unauthorisedAction,
  getHeaders,
  ...rest
}) => async (dispatch) => {
  const response = await fetchUtil({
    ...rest,
    headers: {
      Accept: 'application/json',
      ...getHeaders(),
    },
  });
  const { status } = response;

  if (status === 401 && unauthorisedAction) {
    dispatch(unauthorisedAction());
  }

  return response;
};

const toPascalCase = ({ val }) => (
  val.replace(/(^|-)[a-z0-9]{1}/gi, match => (
    match[match.length - 1].toUpperCase()
  ))
);

const toCamelCase = ({ val }) => (
  val.replace(/-[a-z0-9]{1}/gi, match => (
    match[match.length - 1].toUpperCase()
  ))
);

const getActions = ({ namespace, name }) => ({
  fetchAction: createAction(namespace, `${name}-fetch`),
  failureAction: createAction(namespace, `${name}-failure`),
  successAction: createAction(namespace, `${name}-success`),
});

const getReducers = ({ name, customSuccessReducer }) => {
  const isFetching = `isFetching${toPascalCase({ val: name })}`;
  const didFail = `did${toPascalCase({ val: name })}Fail`;
  const didSucceed = `did${toPascalCase({ val: name })}Succeed`;
  const response = `${toCamelCase({ val: name })}Response`;

  return {
    fetchReducer: state => ({
      ...state,
      [isFetching]: true,
      [didFail]: false,
      [didSucceed]: false,
      [response]: null,
    }),
    failureReducer: (state, { payload }) => ({
      ...state,
      [isFetching]: false,
      [didFail]: true,
      [didSucceed]: false,
      [response]: R.prop('body', payload),
    }),
    successReducer: (state, { payload }) => ({
      ...state,
      [isFetching]: false,
      [didFail]: false,
      [didSucceed]: true,
      [response]: R.prop('body', payload),
      ...customSuccessReducer(state, { payload }),
    }),
  };
};

const getSideEffect = ({
  fetchAction,
  failureAction,
  successAction,
  url,
  method,
  onSuccess,
  getHeaders,
  unauthorisedAction,
  transformData,
}) => data => async (dispatch, getState) => {
  dispatch(fetchAction());

  const transformedData = transformData ? (
    await transformData({ data, getState })
  ) : data;

  const { ok, body } = await dispatch(fetch({
    url,
    method,
    data: transformedData,
    getHeaders,
    unauthorisedAction,
  }));

  const payload = {
    ...transformedData,
    body,
  };

  if (ok) {
    dispatch(successAction(payload));
    onSuccess({
      ...payload,
      dispatch,
    });
  } else {
    dispatch(failureAction(payload));
  }
};

export default ({
  name,
  namespace,
  url,
  method,
  onSuccess = noop,
  successReducer: customSuccessReducer = noop,
  getHeaders = noop,
  unauthorisedAction,
  transformData,
}) => {
  const { fetchAction, failureAction, successAction } = getActions({ name, namespace });

  const sideEffect = getSideEffect({
    fetchAction,
    failureAction,
    successAction,
    url,
    method,
    onSuccess,
    getHeaders,
    unauthorisedAction,
    transformData,
  });

  const {
    fetchReducer,
    failureReducer,
    successReducer,
  } = getReducers({ name, customSuccessReducer });

  const reducers = [
    [fetchAction, fetchReducer],
    [failureAction, failureReducer],
    [successAction, successReducer],
  ];

  return {
    sideEffect,
    reducers,
    fetchAction,
    failureAction,
    successAction,
  };
};
