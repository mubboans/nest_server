export interface ErrorResponse {
  success: boolean;
  message: string;
  errorCode?: string;
  errors?: any[];
  timestamp: string;
  path: string;
}
