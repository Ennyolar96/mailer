"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const path_1 = __importDefault(require("path"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocs = (app, port) => {
    const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
        refPointerPrefix: "#/components/schemas/",
    });
    const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
    const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, {
        controllers: [path_1.default.join(__dirname, "app/**/*controller.{ts,js}")],
    }, {
        components: {
            schemas: {
                ...schemas,
                SendMailRequest: {
                    type: "object",
                    properties: {
                        config: { $ref: "#/components/schemas/SendMailConfig" },
                        mail: {
                            type: "object",
                            properties: {
                                from: { type: "string", example: "Company name" },
                                to: {
                                    type: "array",
                                    example: '["example@gmail.com", "example@outlook.com"]',
                                },
                                subject: {
                                    type: "string",
                                    example: "Testing the new application",
                                },
                                html: { type: "string", example: "<p>Hello world</p>" },
                                text: { type: "string", example: "Hello world" },
                                attachments: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/MailAttachment",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        info: {
            title: "SMTP Mailer Application",
            description: "API Documentation for SMTP Mailer",
            version: "1.0.0",
        },
        servers: [
            { url: "http://localhost:5001/api", description: "Locally" },
            { url: "", description: "Production" },
        ],
    });
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
};
exports.swaggerDocs = swaggerDocs;
//# sourceMappingURL=swagger.js.map