import querystring from 'querystring';
import FormData from 'form-data';

const arrayBufferToBase64 = ({ buffer }) => {
  const bytes = [...new Uint8Array(buffer)];

  const binary = bytes.reduce((acc, item) => (
    `${acc}${String.fromCharCode(item)}`
  ), '');

  return window.btoa(binary);
};

export const encodeBody = ({ method, data = {} }) => {
  if (method === 'GET') {
    return null;
  }

  if (data instanceof FormData) {
    return data;
  }

  return JSON.stringify(data);
};

export const decodeBody = async ({ response, decodeAsBase64 }) => {
  const { ok, status } = response;
  let body;

  if (decodeAsBase64) {
    const buffer = await response.arrayBuffer();
    body = `data:;base64,${arrayBufferToBase64({ buffer })}`;
  } else {
    body = await response.text();

    try {
      body = JSON.parse(body);
    // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  return {
    ok,
    status,
    body,
  };
};

export const getHeaders = ({ data, headers }) => (
  data instanceof FormData ? (headers) : ({
    'Content-Type': 'application/json',
    ...headers,
  })
);

export const getURL = ({ url, method, data }) => (
  method === 'GET' ? (
    `${url}?${querystring.stringify(data)}`
  ) : (
    url
  )
);

const timer = ({ timeout, url }) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Fetch timeout for ${url}`));
    }, timeout);
  })
);

export default async ({
  url: originalURL,
  data = {},
  headers = {},
  method = 'GET',
  decodeAsBase64 = false,
  credentials = 'same-origin',
  timeout,
  signal,
}) => {
  const url = getURL({ url: originalURL, method, data });
  const parsedHeaders = getHeaders({ data, headers });
  const body = encodeBody({ method, data });

  const fetchCall = fetch(url, {
    method,
    headers: parsedHeaders,
    body,
    credentials,
    signal,
  }).then(response => decodeBody({ response, decodeAsBase64 }));

  const returnedPromise = timeout ? (
    Promise.race([fetchCall, timer({ timeout, url })])
  ) : fetchCall;

  return returnedPromise.catch((err) => {
    console.error(err);
    return {
      ok: false,
      status: 0,
      body: {},
    };
  });
};
