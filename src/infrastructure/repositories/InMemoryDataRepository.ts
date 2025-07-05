import { DataRepository } from "../../domain/repositories/DataRepository";
import { DataItem } from "../../domain/entities/DataItem";
import { inspect } from "util";

interface RawDataItem {
  id: string;
  data: number;
}

export class InMemoryDataRepository implements DataRepository {
  private data: RawDataItem[] = [
    { id: "d1", data: 0 },
    { id: "d2", data: 0 },
    { id: "d3", data: 0 },
  ];

  private static toDataItem(rawDataItem: RawDataItem): DataItem {
    return {
      id: rawDataItem.id,
      data: inspect(rawDataItem),
    };
  }

  findAll(): DataItem[] {
    return this.data.map(InMemoryDataRepository.toDataItem);
  }

  findById(id: string): DataItem | undefined {
    const rawDataItem = this.data.find((item) => item.id === id);
    if (rawDataItem) {
      return InMemoryDataRepository.toDataItem(rawDataItem);
    }
    return undefined;
  }

  update(): void {
    this.data.forEach((item) => {
      item.data = item.data + 1;
    });
  }
}
