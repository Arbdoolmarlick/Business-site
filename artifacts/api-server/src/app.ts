import express, { type Express, type Request, type Response } from "express";
import path from "node:path";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const clientBuildPath = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "ibrahimawa-global-farm",
  "dist",
  "public",
);

app.use(express.static(clientBuildPath));

export default app;
