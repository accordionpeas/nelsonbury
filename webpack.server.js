const path = require('path');

module.exports = env => (
  {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
    name: 'server',
    target: 'node',

    entry: {
      app: './app/server/index.js',
    },

    output: {
      path: path.join(__dirname, 'build/server'),
      filename: 'index.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          options: {
            retainLines: true,
          },
        },
      ],
    },

    watchOptions: {
      ignored: ['node_modules', 'build'],
    },
  }
);
