import { DataItem } from "../entities/DataItem";
import { DataRepository } from "../repositories/DataRepository";
import { ScreenConnectionRepository } from "../repositories/ScreenConnectionRepository";

export class GetScreenDataUseCase {
  constructor(
    private dataRepository: DataRepository,
    private screenConnectionRepository: ScreenConnectionRepository
  ) {}

  execute(screenId: string, name?: string): DataItem | { data: string } {
    // lastActive 갱신
    const connection = this.screenConnectionRepository.getConnection(screenId);
    if (!connection) {
      this.screenConnectionRepository.createConnection(screenId, null);
    } else {
      this.screenConnectionRepository.updateLastActive(screenId);
    }

    // name이 오면 갱신
    if (name) {
      this.screenConnectionRepository.updateConnection(
        screenId,
        connection?.dataId || null,
        name
      );
    }

    const dataId = connection?.dataId || null;
    if (!dataId) {
      this.screenConnectionRepository.updateConnection(screenId, null);
      return { data: "Not connected" };
    }

    const item = this.dataRepository.findById(dataId);
    if (item) {
      return item;
    } else {
      return { data: "No data found" };
    }
  }
}
