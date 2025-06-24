export interface ErrorJson {
  name: string;
  code: string;
  errorCode?: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  data?: Record<string, unknown>;
}

export abstract class BaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;
  public readonly data?: Record<string, unknown>;

  constructor(code: string, message: string, statusCode = 500, data?: Record<string, unknown>) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date();
    this.name = this.constructor.name;
    this.data = data;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  public toJSON(): ErrorJson {
    return {
      name: this.name,
      code: this.code,
      data: this.data,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}
