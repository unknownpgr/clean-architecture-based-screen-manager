export interface ScreenConnectionEntry {
  dataId: string | null;
  lastActive: number; // timestamp(ms)
  name?: string; // screen name
}

export type ScreenConnection = { [screenId: string]: ScreenConnectionEntry };
