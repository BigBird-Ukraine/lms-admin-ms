import * as http from 'http';

import { app } from './app';
import { config } from './configs';
import { setDefaultData } from './helpers';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}!`);

  setDefaultData().catch(reason => {
    console.log(reason);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
