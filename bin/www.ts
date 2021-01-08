import { config as dotenvConfig } from 'dotenv';
import { createServer } from '../server';
import { clog } from '../utils/logger';

dotenvConfig();

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: any) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

(async () => {
  const port = normalizePort(process.env.KOA_PORT || '3000');
  const app = await createServer();
  const server = await app.listen(port, () =>
    clog('info', `👂 server is listening on ${port}`)
  );
})();
