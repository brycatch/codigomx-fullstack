import express from 'express';
import cors from 'cors';
import http from 'http';

import { setRouting } from './routes';

export default class Server {
  private static _instance: Server;
  private httpServer: http.Server;

  public app: express.Application;
  public port: number;

  private constructor() {
    this.app = express();
    this.port = 3000; // TODO: Make this port dynamic
    this.httpServer = new http.Server(this.app);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public init(callback: () => void): void {
    this.setBodyParser();
    this.setCors();
    setRouting();
    this.httpServer.listen(this.port, callback);
  }

  private setBodyParser(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  private setCors(): void {
    this.app.use(cors());
  }
}
