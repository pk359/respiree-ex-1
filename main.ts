import compression from 'compression';

import cors from 'cors';
import express from 'express';
import audit from 'express-requests-logger';

import { listenForApis } from './src/api';
import { corsOptions } from './src/utils';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.use(cors(corsOptions));
  server.use(audit());
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept,access-token,Access-Control-Allow-Methods,grant_type,sentry-trace'
    );
    next();
  });
  // gzip
  server.use(compression());
  server.use(express.json({ limit: '50mb' }));

  listenForApis(server);

  return server;
}

function run() {
  const port = process.env.PORT || 4001;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
