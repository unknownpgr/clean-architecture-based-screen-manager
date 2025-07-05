import { ScreenConnectionRepository } from "../../domain/repositories/ScreenConnectionRepository";
import {
  ScreenConnection,
  ScreenConnectionEntry,
} from "../../domain/entities/ScreenConnection";

export class InMemoryScreenConnectionRepository
  implements ScreenConnectionRepository
{
  private screenConnection: ScreenConnection = {};

  getAllConnections(): ScreenConnection {
    return { ...this.screenConnection };
  }

  getConnection(screenId: string): ScreenConnectionEntry | undefined {
    return this.screenConnection[screenId];
  }

  createConnection(
    screenId: string,
    dataId: string | null,
    name?: string
  ): void {
    this.screenConnection[screenId] = {
      dataId,
      lastActive: Date.now(),
      name,
    };
  }

  updateConnection(
    screenId: string,
    dataId: string | null,
    name?: string
  ): void {
    if (this.screenConnection[screenId]) {
      this.screenConnection[screenId] = {
        ...this.screenConnection[screenId],
        dataId,
        lastActive: Date.now(),
        name: name || this.screenConnection[screenId].name,
      };
    } else {
      this.createConnection(screenId, dataId, name);
    }
  }

  updateLastActive(screenId: string): void {
    if (this.screenConnection[screenId]) {
      this.screenConnection[screenId].lastActive = Date.now();
    }
  }

  removeInactiveConnections(timeoutMs: number): void {
    const now = Date.now();
    Object.entries(this.screenConnection).forEach(([screenId, entry]) => {
      if (now - entry.lastActive > timeoutMs) {
        delete this.screenConnection[screenId];
      }
    });
  }
}
