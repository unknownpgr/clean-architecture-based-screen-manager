import { DataItem } from "../entities/DataItem";
import { DataRepository } from "../repositories/DataRepository";

export class GetDataUseCase {
  constructor(private dataRepository: DataRepository) {}

  execute(id: string): DataItem | { data: string } {
    const item = this.dataRepository.findById(id);

    if (item) {
      return {
        id: item.id,
        data: item.data,
      };
    } else {
      return { data: "No data found" };
    }
  }
}
