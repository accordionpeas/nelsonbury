import serveStatic from 'serve-static';

export default () => {
  const isDevelopmentMode = process.env.NODE_ENV === 'development';

  return serveStatic('build/public', {
    immutable: !isDevelopmentMode,
    maxAge: isDevelopmentMode ? 0 : 31536000000, // 1 year
  });
};
