import { ScreenConnectionRepository } from "../repositories/ScreenConnectionRepository";

export class GetConnectionsUseCase {
  constructor(private screenConnectionRepository: ScreenConnectionRepository) {}

  execute(): { [screenId: string]: { dataId: string | null; name?: string } } {
    const connections = this.screenConnectionRepository.getAllConnections();
    const result: {
      [screenId: string]: { dataId: string | null; name?: string };
    } = {};

    Object.entries(connections).forEach(([screenId, entry]) => {
      result[screenId] = {
        dataId: entry.dataId,
        name: entry.name,
      };
    });

    return result;
  }
}
