import React from 'react';
import * as R from 'ramda';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

const defaultTitle = 'Nelsonbury';

const getAssets = ({ assets, routeAssets }) => ({
  ...assets,
  css: [
    ...R.propOr([], 'css', assets),
    ...R.propOr([], 'css', routeAssets),
  ],
  js: [
    ...R.propOr([], 'js', assets),
    ...R.propOr([], 'js', routeAssets),
  ],
});

const getHTML = ({
  html = '',
  title = '',
  description = '',
  finalState = {},
  assets = {},
  routeAssets = {},
}) => {
  const {
    favicon = '',
    css = [],
    js = [],
  } = getAssets({ assets, routeAssets });

  const allCSS = css.reduce((str, cssSrc) => (
    `${str}<link rel="stylesheet" href="${cssSrc}" />\n`
  ), '');

  const allJS = js.reduce((str, jsSrc) => (
    `${str}<script async src="${jsSrc}"></script>\n`
  ), '');

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${description}">
        <title>${title || defaultTitle}</title>
        ${allCSS}
        <link rel="shortcut icon" type="image/png" href="${favicon}" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script id="preloaded-state" type="application/json">
          ${JSON.stringify(finalState).replace(/</g, '\\u003c')}
        </script>
        ${allJS}
      </body>
    </html>
  `;
};

const renderFullPage = ({
  url,
  title,
  description,
  App,
  createStore,
  preloadedState,
  assets,
  routeAssets,
}) => {
  const context = {};
  const store = createStore(preloadedState);
  const finalState = store.getState();

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  return getHTML({
    html,
    title,
    description,
    finalState,
    assets,
    routeAssets,
  });
};

export default renderFullPage;
