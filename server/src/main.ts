import Server from './server';

const port = (process.env.PORT || 3000) as number;
const server = new Server({ port });

server.start();
