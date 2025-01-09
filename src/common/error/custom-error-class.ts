export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly errorCode?: string,
    public readonly errors?: any[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
