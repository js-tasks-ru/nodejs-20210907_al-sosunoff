import LineSplitStream from './LineSplitStream';
import os from 'os';

new LineSplitStream({ encoding: 'utf-8' });

const lines = new LineSplitStream({
  splitSymbol: os.EOL,
  encoding: 'utf-8',
});

lines.on('data', (chunk: any) => {
  console.log('data', chunk);
});

/* lines.write(`a${os.EOL}b`); */

lines.write('a');
lines.write(`b${os.EOL}c`);
lines.write(`d${os.EOL}e`);
lines.write('f');

lines.end();
