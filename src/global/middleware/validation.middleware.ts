import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
  UnprocessableEntityError,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator";
import { Service } from "typedi";

interface ValidationHttpError extends HttpError {
  errors: ValidationError[];
}

@Service()
@Middleware({ type: "after" })
export class CustomValidationErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction): void {
    // Handle stream errors specifically
    const env = process.env.NODE_ENV === "development";

    if (
      error.message?.includes("stream") &&
      error.message?.includes("readable")
    ) {
      console.error("Stream error detected:", error);
      res.status(400).json({
        status: 422,
        success: false,
        message: "Invalid request payload",
        errors: "The request body could not be processed",
      });
      return;
    }

    if (res.headersSent) return next(error);

    // Handle UnprocessableEntityError (422) explicitly
    if (error instanceof UnprocessableEntityError || error.httpCode === 422) {
      res.status(422).json({
        status: 422,
        success: false,
        message: error.message || "Validation failed",
        errors: "Input validation error",
      });
      return;
    }

    // Handle class-validator errors
    if (this.isValidationError(error)) {
      res.status(422).json({
        status: 422,
        success: false,
        message: "Validation failed",
        errors: this.formatValidationErrors(error.errors),
      });
      return;
    }

    if (error instanceof HttpError) {
      // Handle routing-controllers HttpErrors
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

    // Uncaught errors
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

  private isValidationError(error: any): error is ValidationHttpError {
    return (
      error instanceof HttpError &&
      error.httpCode === 400 &&
      Array.isArray((error as any).errors) &&
      (error as any).errors.some((e: any) => e instanceof ValidationError)
    );
  }

  private formatValidationErrors(errors: ValidationError[]): any[] {
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
}
