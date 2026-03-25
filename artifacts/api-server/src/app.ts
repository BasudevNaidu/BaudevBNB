import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";
import { IncomingMessage, ServerResponse } from "http";

// Modern ESM-compatible import for pino-http
import pinoHttpCommonJS = require("pino-http");
import type { PinoHttpOptions } from "pino-http";

// Tell TypeScript this is callable
const pinoHttp = pinoHttpCommonJS as unknown as (opts?: PinoHttpOptions) => any;

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
