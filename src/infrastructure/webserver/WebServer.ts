import express, { Application } from "express";
import { DataController } from "../controllers/DataController";
import { ConnectionController } from "../controllers/ConnectionController";
import { createDataRoutes } from "../routes/dataRoutes";
import { createConnectionRoutes } from "../routes/connectionRoutes";

export class WebServer {
  private app: Application;

  constructor(
    private dataController: DataController,
    private connectionController: ConnectionController
  ) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.static("public"));
  }

  private setupRoutes(): void {
    // 기본 라우트
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // 데이터 라우트
    this.app.use("/data", createDataRoutes(this.dataController));

    // 연결 라우트
    this.app.use("/", createConnectionRoutes(this.connectionController));
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
