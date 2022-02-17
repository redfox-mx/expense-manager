import Server from './server';
import databaseLoader from './database';

const port = (process.env.PORT || 8080) as number;
const server = new Server({
  port,
  preload: databaseLoader,
});

server.start();
