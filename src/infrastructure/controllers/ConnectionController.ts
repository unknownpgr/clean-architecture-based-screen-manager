import { Request, Response } from "express";
import { GetConnectionsUseCase } from "../../domain/usecases/GetConnectionsUseCase";
import { ConnectScreenUseCase } from "../../domain/usecases/ConnectScreenUseCase";

export class ConnectionController {
  constructor(
    private getConnectionsUseCase: GetConnectionsUseCase,
    private connectScreenUseCase: ConnectScreenUseCase
  ) {}

  getConnections(req: Request, res: Response): void {
    const result = this.getConnectionsUseCase.execute();
    res.send(result);
  }

  connectScreen(req: Request, res: Response): void {
    const screenId: string | undefined = req.query.screenId as string;
    const dataId: string | undefined = req.query.dataId as string;
    const name: string | undefined = req.query.name as string;

    if (!screenId || !dataId) {
      res.status(400).send({ error: "screenId and dataId are required" });
      return;
    }

    const result = this.connectScreenUseCase.execute(screenId, dataId, name);
    res.send(result);
  }
}
