import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { applicationMiddlewares } from "./app.module";

dotenv.config({ quiet: true });
const app: Application = express();
useContainer(Container);

async function bootstrap() {
  applicationMiddlewares(app);
  useExpressServer(app, {
    routePrefix: "/api",
    validation: {
      whitelist: true,
      validationError: { target: false, value: false },
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      skipMissingProperties: false,
    },
    defaultErrorHandler: false,
    development: process.env.ENVIRONMENT === "development",
    classTransformer: true,
    controllers: [path.join(__dirname, "app/**/*.controller.{ts,js}")],
    middlewares: [path.join(__dirname, "global/**/*.middleware.{ts,js}")],
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
  process.on("unhandledRejection", gracefulShutdown);
  process.on("uncaughtException", gracefulShutdown);
}

bootstrap();
