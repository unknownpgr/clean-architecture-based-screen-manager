import { Request, Response } from "express";
import { GetDataUseCase } from "../../domain/usecases/GetDataUseCase";
import { GetScreenDataUseCase } from "../../domain/usecases/GetScreenDataUseCase";

export class DataController {
  constructor(
    private getDataUseCase: GetDataUseCase,
    private getScreenDataUseCase: GetScreenDataUseCase
  ) {}

  getDataById(req: Request, res: Response): void {
    const id: string = req.params.id;
    const result = this.getDataUseCase.execute(id);
    res.send(result);
  }

  getScreenData(req: Request, res: Response): void {
    const screenId: string | undefined = req.query.screenId as string;
    const name: string | undefined = req.query.name as string;

    if (!screenId) {
      res.status(400).send({ error: "screenId is required" });
      return;
    }

    const result = this.getScreenDataUseCase.execute(screenId, name);
    res.send(result);
  }
}
