export class NotFoundProductByIdError extends Error {
  code = 'NOT_FOUND_PRODUCT_BY_ID';
  status: number;

  constructor(status: number) {
    super('Not found product by id error');

    this.name = this.constructor.name;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}
