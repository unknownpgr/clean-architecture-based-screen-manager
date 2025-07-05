import {
  ScreenConnection,
  ScreenConnectionEntry,
} from "../entities/ScreenConnection";

export interface ScreenConnectionRepository {
  getAllConnections(): ScreenConnection;
  getConnection(screenId: string): ScreenConnectionEntry | undefined;
  createConnection(
    screenId: string,
    dataId: string | null,
    name?: string
  ): void;
  updateConnection(
    screenId: string,
    dataId: string | null,
    name?: string
  ): void;
  updateLastActive(screenId: string): void;
  removeInactiveConnections(timeoutMs: number): void;
}
