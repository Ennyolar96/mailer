"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const app_module_1 = require("./app.module");
const swagger_1 = require("swagger");
dotenv_1.default.config({ quiet: true });
const app = (0, express_1.default)();
(0, routing_controllers_1.useContainer)(typedi_1.Container);
async function bootstrap() {
    (0, app_module_1.applicationMiddlewares)(app);
    (0, routing_controllers_1.useExpressServer)(app, {
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
        controllers: [path_1.default.join(__dirname, "app/**/*.controller.{ts,js}")],
        middlewares: [path_1.default.join(__dirname, "global/**/*.middleware.{ts,js}")],
    });
    const PORT = process.env.PORT || 5001;
    (0, swagger_1.swaggerDocs)(app, PORT);
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
//# sourceMappingURL=main.js.map