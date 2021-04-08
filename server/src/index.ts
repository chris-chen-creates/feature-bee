import express from 'express';
import mysql from 'mysql';

import Config from './config';
import logMiddleware from './middleware/logger';
import errMiddleware from './middleware/errors';
import HealthRouter from './routes/health';

const app = express();
const PORT = 8000;

const BASE_PATH = '/api/v1'

async function main() {
  const config = Config.readFromEnvironment();
  const db = mysql.createConnection(config.dbOptions());
  const healthRouter = new HealthRouter(db);

  // apply middleware
  app.use(express.json());
  app.use(logMiddleware);

  // setup routers
  app.use(BASE_PATH, healthRouter.routes());

  // begin serving traffic
  await app.listen(3001, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  }).on('error', (err) => {
    throw(err);
  });
}

main();
