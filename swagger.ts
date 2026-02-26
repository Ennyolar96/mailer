import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { Application } from "express";
import path from "path";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";

export const swaggerDocs = (app: Application, port: number | string) => {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: "#/components/schemas/",
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    {
      controllers: [path.join(__dirname, "app/**/*controller.{ts,js}")],
    },
    {
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
    },
  );

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
};
