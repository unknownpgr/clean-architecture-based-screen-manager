import { DataSourceRepository } from "../repositories/DataSourceRepository";
import { DataSource } from "../entities/DataSource";

export class GetDataSourcesUseCase {
  constructor(private dataSourceRepository: DataSourceRepository) {}

  execute(): DataSource[] {
    return this.dataSourceRepository.getAllDataSources();
  }
}
