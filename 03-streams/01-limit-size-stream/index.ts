import fs from 'fs';
import path from 'path';
import LimitSizeStream from './LimitSizeStream';

const limitedStream = new LimitSizeStream({ limit: 8, encoding: 'utf-8' }); // 8 байт

const outStream = fs.createWriteStream(path.resolve(__dirname, 'out.txt'));

limitedStream.pipe(outStream);

limitedStream.write('hello'); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

setTimeout(() => {
  limitedStream.write('world'); // ошибка LimitExceeded! в файле осталось только hello
}, 10);
