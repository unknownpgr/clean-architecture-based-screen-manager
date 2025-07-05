import express, { Request, Response } from "express";
import { inspect } from "util";

const app = express();
const port: number = 3000;

interface DataItem {
  id: string;
  data: number;
}

interface DataResponse {
  id: string;
  data: string;
}

interface ScreenConnectionEntry {
  dataId: string | null;
  lastActive: number; // timestamp(ms)
  name?: string; // screen name
}

type ScreenConnection = { [screenId: string]: ScreenConnectionEntry };

const data: DataItem[] = [
  {
    id: "d1",
    data: 0,
  },
  {
    id: "d2",
    data: 0,
  },
  {
    id: "d3",
    data: 0,
  },
];

/**
 * Key: screenId
 * Value: { dataId, lastActive }
 */
const screenConnection: ScreenConnection = {};

setInterval(() => {
  data.forEach((item) => {
    item.data++;
  });
}, 1000);

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/data/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  const item: DataItem | undefined = data.find((item) => item.id === id);

  if (item) {
    const copy: DataResponse = {
      id: item.id,
      data: Number(item.id.replace("d", "")) + ":" + item.data,
    };
    res.send(copy);
  } else {
    res.send({ data: "No data found" });
  }
});

app.get("/data", (req: Request, res: Response) => {
  const screenId: string | undefined = req.query.screenId as string;
  const name: string | undefined = req.query.name as string;
  if (!screenId) {
    res.status(400).send({ error: "screenId is required" });
    return;
  }

  // lastActive 갱신
  if (!screenConnection[screenId]) {
    screenConnection[screenId] = { dataId: null, lastActive: Date.now() };
  } else {
    screenConnection[screenId].lastActive = Date.now();
  }

  // name이 오면 갱신
  if (name) {
    screenConnection[screenId].name = name;
  }

  const dataId: string | null = screenConnection[screenId].dataId;
  if (!dataId) {
    screenConnection[screenId].dataId = null;
    console.log(inspect(screenConnection));
    res.send({ data: "Not connected" });
    return;
  }

  const item: DataItem | undefined = data.find((item) => item.id === dataId);
  if (item) {
    const copy: DataResponse = {
      id: item.id,
      data: Number(item.id.replace("d", "")) + ":" + item.data,
    };
    res.send(copy);
  } else {
    res.send({ data: "No data found" });
  }
});

app.get("/connections", (req: Request, res: Response) => {
  // 스크린 정보를 포함하여 반환
  const result: {
    [screenId: string]: { dataId: string | null; name?: string };
  } = {};
  Object.entries(screenConnection).forEach(([screenId, entry]) => {
    result[screenId] = {
      dataId: entry.dataId,
      name: entry.name,
    };
  });
  res.send(result);
});

app.get("/connect", (req: Request, res: Response) => {
  const screenId: string | undefined = req.query.screenId as string;
  const dataId: string | undefined = req.query.dataId as string;
  const name: string | undefined = req.query.name as string;

  if (!screenId || !dataId) {
    res.status(400).send({ error: "screenId and dataId are required" });
    return;
  }

  // 연결 및 lastActive 갱신
  screenConnection[screenId] = {
    dataId: dataId === "null" ? null : dataId,
    lastActive: Date.now(),
    name: name || undefined,
  };
  res.send({ data: "Connected" });
});

// 2초마다 lastActive가 2초 이상 지난 screen 제거
setInterval(() => {
  const now = Date.now();
  Object.entries(screenConnection).forEach(([screenId, entry]) => {
    if (now - entry.lastActive > 2000) {
      delete screenConnection[screenId];
    }
  });
}, 2000);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
