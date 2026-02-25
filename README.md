# SMTP Mailer API ✉️

[![Vercel Deployment Status](https://vercelbadge.vercel.app/api/Ennyolar96/mailer)](https://vercel.com/Ennyolar96/mailer)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-000000?style=for-the-badge&logo=nodemailer&logoColor=white)](https://nodemailer.com/)
[![routing-controllers](https://img.shields.io/badge/routing--controllers-000000?style=for-the-badge&logo=routing-controllers&logoColor=white)](https://github.com/typestack/routing-controllers)
[![TypeDI](https://img.shields.io/badge/TypeDI-000000?style=for-the-badge&logo=typedi&logoColor=white)](https://github.com/typestack/typedi)
[![class-validator](https://img.shields.io/badge/class--validator-000000?style=for-the-badge&logo=class-validator&logoColor=white)](https://github.com/typestack/class-validator)

## Overview

SMTP Mailer API is a robust, high-performance email sending service built with TypeScript, Node.js, and Express. It leverages `nodemailer` to facilitate secure and efficient mail delivery, featuring configurable SMTP settings, concurrent email dispatch, and comprehensive input validation to ensure reliable communication.

## Key Features

- **Concurrent Mail Dispatch**: Efficiently sends emails to multiple recipients in parallel with controlled concurrency using `p-limit`.
- **Configurable SMTP Integration**: Supports flexible SMTP configurations (host, port, security, authentication) to connect with various mail providers.
- **Robust Input Validation**: Ensures data integrity and security through `class-validator` and `class-transformer` for all incoming requests.
- **Enhanced API Security**: Integrates industry-standard security middlewares like `helmet`, `cors`, `hpp`, and `compression`.
- **Detailed Error Handling**: Provides structured and informative error responses for validation failures and other API issues.
- **TypeScript-First Development**: Built with TypeScript for type safety, better maintainability, and improved developer experience.
- **Dependency Injection**: Utilizes `TypeDI` for managing dependencies and promoting a modular, testable codebase.
- **API Health Monitoring**: Includes a dedicated `/health` endpoint for monitoring application status, uptime, and memory usage.

## Technologies Used

| Technology                                                                    | Description                                                                |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)                                 | Superset of JavaScript for type-safe development.                          |
| [Node.js](https://nodejs.org/)                                                | JavaScript runtime for server-side execution.                              |
| [Express.js](https://expressjs.com/)                                          | Fast, unopinionated, minimalist web framework for Node.js.                 |
| [routing-controllers](https://github.com/typestack/routing-controllers)       | Decorator-based approach for building REST APIs with Express.              |
| [TypeDI](https://github.com/typestack/typedi)                                 | Dependency injection container for TypeScript.                             |
| [class-validator](https://github.com/typestack/class-validator)               | Decorator-based validation for classes.                                    |
| [class-transformer](https://github.com/typestack/class-transformer)           | Converts plain objects to instances of classes.                            |
| [Nodemailer](https://nodemailer.com/)                                         | Module for sending emails with Node.js.                                    |
| [helmet](https://helmetjs.github.io/)                                         | Helps secure Express apps by setting various HTTP headers.                 |
| [cors](https://expressjs.com/en/resources/middleware/cors.html)               | Provides a Connect/Express middleware for enabling CORS.                   |
| [hpp](https://github.com/analog-nico/hpp)                                     | Protects against HTTP Parameter Pollution attacks.                         |
| [compression](https://expressjs.com/en/resources/middleware/compression.html) | Middleware for compressing HTTP responses.                                 |
| [p-limit](https://github.com/sindresorhus/p-limit)                            | Run multiple promise-returning & async functions with a concurrency limit. |
| [dotenv](https://github.com/motdotla/dotenv)                                  | Loads environment variables from a `.env` file.                            |

## Getting Started

### Installation

To set up and run SMTP Mailer API locally, follow these steps:

- **Clone the Repository**:
  ```bash
  git clone https://github.com/Ennyolar96/mailer.git
  cd mailer
  ```
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Build the Project**:
  Compile the TypeScript code into JavaScript:
  ```bash
  npm run build
  ```
- **Start the Application**:
  ```bash
  npm start
  ```
  The application will typically run on `http://localhost:5001` or the port specified in your environment variables.

### Environment Variables

The application requires the following environment variables. Create a `.env` file in the project root and populate it as follows:

- `PORT`: The port on which the server will listen.
  - Example: `PORT=5001`
- `ENVIRONMENT`: The current operating environment (e.g., `development`, `production`).
  - Example: `ENVIRONMENT=development`

## API Documentation

### Base URL

The base URL for controller-defined API endpoints is `/api`. Root-level endpoints like `/health` and `/` are accessible directly from the application's root.

### Endpoints

#### `GET /health`

Checks the health and status of the API.

**Request**:
No request body.

**Response**:
`HTTP/1.1 200 OK`

```json
{
  "status": "OK",
  "uptime": 1234.56,
  "memoryUsage": {
    "rss": 50000000,
    "heapTotal": 20000000,
    "heapUsed": 15000000,
    "external": 1000000,
    "arrayBuffers": 1000000
  }
}
```

**Errors**:

- `500 Internal Server Error`: An unexpected server-side error occurred while processing the health check.

#### `GET /`

A simple root endpoint to confirm the API is running.

**Request**:
No request body.

**Response**:
`HTTP/1.1 200 OK`

```
Hello, Welcome
```

**Errors**:

- `500 Internal Server Error`: An unexpected server-side error occurred.

#### `POST /api/send`

Sends one or more emails using the provided SMTP configuration and mail details.

**Request**:
`Content-Type: application/json`

```json
{
  "config": {
    "host": "smtp.example.com",
    "port": 587,
    "secure": false,
    "auth": {
      "user": "your_email@example.com",
      "pass": "your_email_password"
    }
  },
  "mail": {
    "from": "sender@example.com",
    "to": ["recipient1@example.com", "recipient2@example.com"],
    "subject": "Hello from Strepl Mailer!",
    "html": "<p><b>This is an HTML email!</b></p>",
    "text": "This is a plain text email.",
    "attachments": [
      {
        "filename": "document.pdf",
        "path": "https://example.com/document.pdf",
        "contentType": "application/pdf"
      },
      {
        "filename": "image.png",
        "content": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEgQF/KzWdAAAAAElFTkSuQmCC",
        "cid": "unique@example.com",
        "contentType": "image/png"
      }
    ]
  }
}
```

**Response**:
`HTTP/1.1 200 OK`

```json
{
  "success": true,
  "message": "Email send successfully",
  "data": {
    "accepted": ["recipient1@example.com"],
    "rejected": ["recipient2@example.com"],
    "response": "250 2.0.0 OK ..."
  }
}
```

**Errors**:

- `422 Unprocessable Entity`: Occurs when the request payload fails validation. The `errors` field will contain an array detailing validation issues.
  ```json
  {
    "status": 422,
    "success": false,
    "message": "Validation failed",
    "errors": [
      {
        "field": "mail",
        "children": [
          {
            "field": "to",
            "messages": [
              "Mail To should not be empty",
              "Mail To should be string"
            ]
          }
        ]
      }
    ]
  }
  ```
- `400 Bad Request`: General issues with the request format or unparseable payload.
  ```json
  {
    "status": 400,
    "success": false,
    "message": "Invalid request payload",
    "errors": "The request body could not be processed"
  }
  ```
- `500 Internal Server Error`: An unexpected server-side error occurred.
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Something went wrong",
    "errors": "Internal server error"
  }
  ```

**Usage Example**:

Here's an example using `curl` to send an email:

```bash
curl -X POST \
  http://localhost:5001/api/send \
  -H 'Content-Type: application/json' \
  -d '{
    "config": {
      "host": "smtp.mailtrap.io",
      "port": 2525,
      "secure": false,
      "auth": {
        "user": "your_mailtrap_user",
        "pass": "your_mailtrap_password"
      }
    },
    "mail": {
      "from": "sender@yourdomain.com",
      "to": ["receiver@example.com"],
      "subject": "Test Email from SMTP Mailer",
      "html": "<h1>Hello from SMTP Mailer!</h1><p>This is a test email sent via your API.</p>"
    }
  }'
```

## Contributing

We welcome contributions to the SMTP Mailer API! To contribute:

- 🍴 Fork the repository.
- 🌟 Create a new branch for your features or bug fixes (`git checkout -b feature/your-feature-name`).
- ✨ Implement your changes and write tests if applicable.
- ✅ Ensure all tests pass and code adheres to the project's style guidelines.
- ⬆️ Commit your changes (`git commit -m 'feat: Add new feature'`).
- 🚀 Push to your branch (`git push origin feature/your-feature-name`).
- 📝 Open a pull request describing your changes.

## License

This project is licensed under the MIT License.

## Author Info

**Ennyolar96**
A passionate software engineer focused on building scalable and robust backend systems.

- **LinkedIn**: [https://www.linkedin.com/in/ennyolar96](https://www.linkedin.com/in/ennyolar96)
- **X (Twitter)**: [https://x.com/Ennyolar96](https://x.com/Ennyolar96)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
