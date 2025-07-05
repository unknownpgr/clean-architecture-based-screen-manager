import express, { Application } from "express";
import { DataController } from "../controllers/DataController";
import { ConnectionController } from "../controllers/ConnectionController";
import { DataSourceController } from "../controllers/DataSourceController";
import { createDataRoutes } from "../routes/dataRoutes";
import { createConnectionRoutes } from "../routes/connectionRoutes";
import { createDataSourceRoutes } from "../routes/dataSourceRoutes";

export class WebServer {
  private app: Application;

  constructor(
    private dataController: DataController,
    private connectionController: ConnectionController,
    private dataSourceController: DataSourceController
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

    // 데이터 소스 라우트
    this.app.use("/", createDataSourceRoutes(this.dataSourceController));

    // 연결 라우트
    this.app.use("/", createConnectionRoutes(this.connectionController));
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
