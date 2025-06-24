export interface ErrorJson {
  name: string;
  code: string;
  errorCode: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  data?: Record<string, unknown>;
}

export abstract class BaseError extends Error {
  public readonly code: string;
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;

  constructor(code: string, errorCode: string, message: string, statusCode = 500) {
    super(message);
    this.code = code;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.timestamp = new Date();
    this.name = this.constructor.name;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  public toJSON(): ErrorJson {
    return {
      name: this.name,
      code: this.code,
      errorCode: this.errorCode,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}
