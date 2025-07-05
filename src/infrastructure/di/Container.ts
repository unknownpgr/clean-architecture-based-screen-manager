import { DataRepository } from "../../domain/repositories/DataRepository";
import { ScreenConnectionRepository } from "../../domain/repositories/ScreenConnectionRepository";
import { InMemoryDataRepository } from "../repositories/InMemoryDataRepository";
import { InMemoryScreenConnectionRepository } from "../repositories/InMemoryScreenConnectionRepository";
import { GetDataUseCase } from "../../domain/usecases/GetDataUseCase";
import { GetScreenDataUseCase } from "../../domain/usecases/GetScreenDataUseCase";
import { GetConnectionsUseCase } from "../../domain/usecases/GetConnectionsUseCase";
import { ConnectScreenUseCase } from "../../domain/usecases/ConnectScreenUseCase";
import { DataController } from "../controllers/DataController";
import { ConnectionController } from "../controllers/ConnectionController";
import { WebServer } from "../webserver/WebServer";

export class Container {
  private static instance: Container;
  private dataRepository!: DataRepository;
  private screenConnectionRepository!: ScreenConnectionRepository;
  private getDataUseCase!: GetDataUseCase;
  private getScreenDataUseCase!: GetScreenDataUseCase;
  private getConnectionsUseCase!: GetConnectionsUseCase;
  private connectScreenUseCase!: ConnectScreenUseCase;
  private dataController!: DataController;
  private connectionController!: ConnectionController;
  private webServer!: WebServer;

  private constructor() {
    this.initializeDependencies();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private initializeDependencies(): void {
    // Repositories
    this.dataRepository = new InMemoryDataRepository();
    this.screenConnectionRepository = new InMemoryScreenConnectionRepository();

    // Use Cases
    this.getDataUseCase = new GetDataUseCase(this.dataRepository);
    this.getScreenDataUseCase = new GetScreenDataUseCase(
      this.dataRepository,
      this.screenConnectionRepository
    );
    this.getConnectionsUseCase = new GetConnectionsUseCase(
      this.screenConnectionRepository
    );
    this.connectScreenUseCase = new ConnectScreenUseCase(
      this.screenConnectionRepository
    );

    // Controllers
    this.dataController = new DataController(
      this.getDataUseCase,
      this.getScreenDataUseCase
    );
    this.connectionController = new ConnectionController(
      this.getConnectionsUseCase,
      this.connectScreenUseCase
    );

    // Web Server
    this.webServer = new WebServer(
      this.dataController,
      this.connectionController
    );
  }

  getDataRepository(): DataRepository {
    return this.dataRepository;
  }

  getScreenConnectionRepository(): ScreenConnectionRepository {
    return this.screenConnectionRepository;
  }

  getWebServer(): WebServer {
    return this.webServer;
  }
}
