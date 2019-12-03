export const getError = ({ status, message, data }) => (
  new Error(JSON.stringify({ status, message, data }))
);

export const throwError = ({ status, message, data }) => {
  throw getError({ status, message, data });
};

export const parseError = (error) => {
  try {
    return JSON.parse(error.message);
  } catch (err) {
    return {
      status: 500,
      message: error.message,
      stack: error.stack,
      data: {},
    };
  }
};
