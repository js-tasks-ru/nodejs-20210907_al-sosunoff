import stream, { TransformCallback, TransformOptions } from 'stream';
import os from 'os';

interface LineSplitStreamProps extends TransformOptions {
  splitSymbol?: string;
}

export default class LineSplitStream extends stream.Transform {
  cache = '';
  splitSymbol;

  constructor({ splitSymbol = os.EOL, ...options }: LineSplitStreamProps) {
    super(options);

    this.splitSymbol = splitSymbol;
  }

  _transform(
    chunk: Buffer | string | any,
    _: BufferEncoding,
    callback: TransformCallback
  ) {
    let lines: string;

    if (Object.prototype.toString.call(chunk) === '[object Uint8Array]') {
      lines = (chunk as Buffer).toString('utf-8');
    } else {
      lines = chunk;
    }

    lines.split(this.splitSymbol).forEach((line, index) => {
      if(index === 0) {
        this.cache += line;
        return;
      }

      this.push(this.cache, 'utf-8');
      this.cache = line;
    });

    callback();
  }

  _flush(callback: TransformCallback) {
    const tail = this.cache;
    this.cache = '';
    callback(null, tail);
  }
}
