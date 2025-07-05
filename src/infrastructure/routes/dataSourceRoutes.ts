import { Router } from "express";
import { DataSourceController } from "../controllers/DataSourceController";

export function createDataSourceRoutes(
  dataSourceController: DataSourceController
): Router {
  const router = Router();

  router.get("/datasources", (req, res) =>
    dataSourceController.getDataSources(req, res)
  );

  return router;
}
