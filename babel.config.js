const getTargets = (environment) => {
  if (environment === 'client') {
    return {
      browsers: [
        'last 2 versions',
        'ie >= 11',
      ],
    };
  }

  return {
    node: '8',
  };
};

const presetEnv = environment => (
  [
    [
      '@babel/preset-env',
      {
        targets: getTargets(environment),
      },
    ],
  ]
);

const pluginsForAllEnvironments = [
  '@babel/plugin-transform-runtime',
];

const pluginsForTestEnvironment = (environment) => {
  if (environment === 'test') {
    return ['rewire'];
  }

  return [];
};

module.exports = (api) => {
  const environment = api.env();

  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      '@babel/preset-react',
      ...presetEnv(environment),
    ],
    plugins: [
      ...pluginsForAllEnvironments,
      ...pluginsForTestEnvironment(environment),
    ],
  };
};
