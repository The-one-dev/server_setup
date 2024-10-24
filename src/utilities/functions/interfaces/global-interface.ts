export interface ResponseJson {
  status: string;
  message?: string;
  data?: Record<string, any>;
}

export interface ResponseObject {
  statusCode: number;
  message?: string;
  data?: Record<string, any>;
}
