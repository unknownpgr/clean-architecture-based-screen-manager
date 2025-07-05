import { Router } from "express";
import { DataController } from "../controllers/DataController";

export function createDataRoutes(dataController: DataController): Router {
  const router = Router();

  router.get("/:id", (req, res) => dataController.getDataById(req, res));
  router.get("/", (req, res) => dataController.getScreenData(req, res));

  return router;
}
