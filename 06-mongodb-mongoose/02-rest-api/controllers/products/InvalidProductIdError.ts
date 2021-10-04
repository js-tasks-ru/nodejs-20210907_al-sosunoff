export class InvalidProductIdError extends Error {
  code = 'INVALID_PRODUCT_ID';
  status: number;

  constructor(status: number) {
    super('Invalid product id.');

    this.name = this.constructor.name;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}
