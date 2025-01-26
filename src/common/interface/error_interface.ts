export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  errorCode?: string;
  timestamp: string;
}
