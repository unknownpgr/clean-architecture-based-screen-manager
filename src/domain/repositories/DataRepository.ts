import { DataItem } from "../entities/DataItem";

export interface DataRepository {
  findAll(): DataItem[];
  findById(id: string): DataItem | undefined;
  update(): void;
}
