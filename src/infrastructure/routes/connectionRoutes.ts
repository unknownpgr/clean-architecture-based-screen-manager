import { Router } from "express";
import { ConnectionController } from "../controllers/ConnectionController";

export function createConnectionRoutes(
  connectionController: ConnectionController
): Router {
  const router = Router();

  router.get("/connections", (req, res) =>
    connectionController.getConnections(req, res)
  );
  router.get("/connect", (req, res) =>
    connectionController.connectScreen(req, res)
  );

  return router;
}
