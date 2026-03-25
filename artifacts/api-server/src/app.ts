import express, { type Express } from "express";
import cors from "cors";
import pinoHttp = require("pino-http"); // 🔥 this fixes TS2349
import router from "./routes";
import { logger } from "./lib/logger";
import { IncomingMessage, ServerResponse } from "http";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage & { id?: string }) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
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

export default app;
