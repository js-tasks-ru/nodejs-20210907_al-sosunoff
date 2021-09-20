import url, { URL } from 'url';
import http from 'http';
import path from 'path';
import fs from 'fs';
import LimitSizeStream from './LimitSizeStream';
import LimitExceededError from './LimitExceededError';

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);

  const pathname = url.pathname.slice(1);

  if (pathname.split('/').length > 1) {
    res.statusCode = 400;
    res.end('Nesting is not supported');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST': {
      const streamLimit = new LimitSizeStream({ limit: 1048576 });
      const streamWrite = fs.createWriteStream(filepath, { flags: 'wx' });

      req.pipe(streamLimit).pipe(streamWrite);

      req.socket.on('close', (aborted) => {
        if (aborted) {
          streamLimit.destroy();
          streamWrite.destroy();
          fs.unlink(filepath, () => {});
        }
      });

      streamWrite.on('error', (error: LimitExceededError) => {
        if (error.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('file exists');
          return;
        }

        res.statusCode = 500;
        res.end('error');
      });

      streamLimit.on('error', (error: LimitExceededError) => {
        if (error.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('file is too big');
        } else {
          res.statusCode = 500;
          res.end('error');
        }

        streamWrite.destroy();
        fs.unlink(filepath, () => {});
      });

      streamWrite.on('finish', () => {
        res.statusCode = 201;
        res.end('file save ');
      });

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
