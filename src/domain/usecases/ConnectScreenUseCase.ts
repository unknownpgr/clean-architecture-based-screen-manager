import { ScreenConnectionRepository } from "../repositories/ScreenConnectionRepository";

export class ConnectScreenUseCase {
  constructor(private screenConnectionRepository: ScreenConnectionRepository) {}

  execute(screenId: string, dataId: string, name?: string): { data: string } {
    const normalizedDataId = dataId === "null" ? null : dataId;
    this.screenConnectionRepository.createConnection(
      screenId,
      normalizedDataId,
      name
    );
    return { data: "Connected" };
  }
}
