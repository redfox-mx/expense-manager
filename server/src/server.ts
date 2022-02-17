import express, { Application } from 'express';

export interface ServerOptions {
  port: number;
  preload?: Promise<unknown>;
}

export enum ServerStatus {
  UNLOADED,
  PENDING,
  READY,
  FAIL,
}

export default class Server {
  private readonly port: number;

  private app: Application;

  public status: ServerStatus = ServerStatus.UNLOADED;

  constructor({ port, preload }: ServerOptions) {
    this.port = port;
    this.app = express();
    this.preloader(preload);
    this.status = ServerStatus.PENDING;
  }

  private preloader(task: Promise<unknown> | undefined) {
    if (task) {
      task
        .then(() => {
          this.status = ServerStatus.READY;
        })
        .catch(() => {
          this.status = ServerStatus.FAIL;
        });
    }
    this.status = ServerStatus.READY;
  }

  start() {
    if (this.status === ServerStatus.READY) {
      this.app.listen(this.port, () => {
        console.log(`Server ready on localhost:${this.port}`);
      });
    } else {
      console.error("Server could'n be initialized");
    }
  }
}
