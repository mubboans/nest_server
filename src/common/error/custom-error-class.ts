export class CustomError extends Error {
  constructor(
    public message: string,
    public code: number,
    public error?: any,
    public status: string = 'Failed',
  ) {
    super(message);
    this.name = 'CustomError';
  }
}
