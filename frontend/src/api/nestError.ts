export class NestError extends Error {
  statusCode: number;
  error?: string;

  constructor(message: string | string[], statusCode: number, error?: string) {
    super(Array.isArray(message) ? message.join(", ") : message);

    this.name = "NestError";

    this.message = Array.isArray(message) ? message.join(", ") : message;

    this.statusCode = statusCode;
    this.error = error;
  }
}
