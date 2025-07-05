import { Request, Response } from "express";
import { GetDataSourcesUseCase } from "../../domain/usecases/GetDataSourcesUseCase";

export class DataSourceController {
  constructor(private getDataSourcesUseCase: GetDataSourcesUseCase) {}

  getDataSources(req: Request, res: Response): void {
    const dataSources = this.getDataSourcesUseCase.execute();
    res.send(dataSources);
  }
}
