// https://pm2.io/doc/en/runtime/best-practices/graceful-shutdown/

module.exports = ({ server, teardown }) => {
  process.on('SIGINT', () => {
    server.close(async (err) => {
      if (err) {
        process.exit(1);
      }

      if (teardown) {
        await teardown();
      }

      process.exit(0);
    });
  });
};
