import { DataSource } from "../entities/DataSource";

export interface DataSourceRepository {
  getAllDataSources(): DataSource[];
  getDataSourceById(id: string): DataSource | undefined;
}
