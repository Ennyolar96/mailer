"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
let CustomValidationErrorHandler = class CustomValidationErrorHandler {
    error(error, req, res, next) {
        const env = process.env.NODE_ENV === "development";
        if (error.message?.includes("stream") &&
            error.message?.includes("readable")) {
            console.error("Stream error detected:", error);
            res.status(400).json({
                status: 422,
                success: false,
                message: "Invalid request payload",
                errors: "The request body could not be processed",
            });
            return;
        }
        if (res.headersSent)
            return next(error);
        if (error instanceof routing_controllers_1.UnprocessableEntityError || error.httpCode === 422) {
            res.status(422).json({
                status: 422,
                success: false,
                message: error.message || "Validation failed",
                errors: "Input validation error",
            });
            return;
        }
        if (this.isValidationError(error)) {
            res.status(422).json({
                status: 422,
                success: false,
                message: "Validation failed",
                errors: this.formatValidationErrors(error.errors),
            });
            return;
        }
        if (error instanceof routing_controllers_1.HttpError) {
            res.status(error.httpCode).json({
                success: false,
                status: error.httpCode,
                message: error.message,
                ...(env && {
                    stack: error.stack,
                    originalError: error,
                }),
                errors: error.name,
            });
            return;
        }
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                status: 400,
                message: error.message,
                ...(env && {
                    stack: error.stack,
                    originalError: error,
                }),
                errors: error.name,
            });
            return;
        }
        console.error("Unhandled Error:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
            ...(env && {
                stack: error.stack,
                originalError: error.toString(),
            }),
            errors: "Internal server error",
        });
        return;
    }
    isValidationError(error) {
        return (error instanceof routing_controllers_1.HttpError &&
            error.httpCode === 400 &&
            Array.isArray(error.errors) &&
            error.errors.some((e) => e instanceof class_validator_1.ValidationError));
    }
    formatValidationErrors(errors) {
        return errors.map((error) => {
            if (error.children?.length > 0) {
                return {
                    field: error.property,
                    children: this.formatValidationErrors(error.children),
                };
            }
            return {
                field: error.property,
                messages: Object.values(error.constraints || {}),
            };
        });
    }
};
exports.CustomValidationErrorHandler = CustomValidationErrorHandler;
exports.CustomValidationErrorHandler = CustomValidationErrorHandler = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], CustomValidationErrorHandler);
//# sourceMappingURL=validation.middleware.js.map