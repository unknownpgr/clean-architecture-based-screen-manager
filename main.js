const express = require("express");
const { inspect } = require("util");
const app = express();
const port = 3000;

const data = [
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
 * Value: dataId
 */
const screenConnection = {};

setInterval(() => {
  data.forEach((item) => {
    item.data++;
  });
}, 1000);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find((item) => item.id === id);
  if (item) {
    const copy = { ...item };
    copy.data = copy.id + ":" + copy.data;
    res.send(copy);
  } else {
    res.send({ data: "No data found" });
  }
});

app.get("/data", (req, res) => {
  const screenId = req.query.screenId;
  const dataId = screenConnection[screenId];
  if (!dataId) {
    screenConnection[screenId] = null;
    console.log(inspect(screenConnection));
    res.send({ data: "Not connected" });
    return;
  }
  const item = data.find((item) => item.id === dataId);
  if (item) {
    const copy = { ...item };
    copy.data = copy.id + ":" + copy.data;
    res.send(copy);
  } else {
    res.send({ data: "No data found" });
  }
});

app.get("/connections", (req, res) => {
  res.send(screenConnection);
});

app.get("/connect", (req, res) => {
  const screenId = req.query.screenId;
  const dataId = req.query.dataId;
  screenConnection[screenId] = dataId;
  res.send({ data: "Connected" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
