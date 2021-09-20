import stream, { TransformCallback, TransformOptions } from 'stream';
import LimitExceededError from './LimitExceededError';

interface LimitSizeStreamProps extends TransformOptions {
  limit: number;
}

export default class LimitSizeStream extends stream.Transform {
  limit = 0;
  size = 0;
  isObjectMode;

  constructor({ limit, ...options }: LimitSizeStreamProps) {
    super(options);

    this.limit = limit;
    this.size = 0;
    this.isObjectMode = Boolean(options.readableObjectMode);
  }

  _transform(
    chunk: Buffer | string | any,
    _: BufferEncoding,
    callback: TransformCallback
  ) {
    if (this.isObjectMode) {
      this.size += 1;
    } else {
      this.size += chunk.length;
    }

    if (this.size > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}
