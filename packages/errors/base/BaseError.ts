export abstract class BaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;

  constructor(code: string, message: string, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date();
    this.name = this.constructor.name;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  public toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}
