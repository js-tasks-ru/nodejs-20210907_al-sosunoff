import stream, { TransformCallback, TransformOptions } from 'stream';
import LimitExceededError from './LimitExceededError';

interface LimitSizeStreamProps extends TransformOptions {
  limit: number;
}

export default class LimitSizeStream extends stream.Transform {
  limit = 0;

  constructor(options: LimitSizeStreamProps) {
    super(options);

    this.limit = options.limit;
  }

  _transform(
    chunk: Buffer | string | any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    this.limit -= chunk.byteLength;

    if (this.limit > -1) {
      callback(null, chunk);
      return;
    }

    callback(new LimitExceededError());
  }
}
