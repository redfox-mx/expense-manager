import express, { Application } from 'express';

export interface ServerOptions {
  port: number;
}

export default class Server {
  private readonly port: number;

  private app: Application;

  constructor({ port }: ServerOptions) {
    this.port = port;
    this.app = express();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server ready on localhost:${this.port}`);
    });
  }
}
