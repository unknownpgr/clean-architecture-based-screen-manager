import { DataSourceRepository } from "../../domain/repositories/DataSourceRepository";
import { DataSource } from "../../domain/entities/DataSource";

export class InMemoryDataSourceRepository implements DataSourceRepository {
  private dataSources: DataSource[] = [
    {
      id: "d1",
      name: "Data Source 1",
      icon: "📈",
      description: "Primary data stream",
    },
    {
      id: "d2",
      name: "Data Source 2",
      icon: "📊",
      description: "Secondary data stream",
    },
    {
      id: "d3",
      name: "Data Source 3",
      icon: "📉",
      description: "Tertiary data stream",
    },
  ];

  getAllDataSources(): DataSource[] {
    return [...this.dataSources];
  }

  getDataSourceById(id: string): DataSource | undefined {
    return this.dataSources.find((source) => source.id === id);
  }
}
