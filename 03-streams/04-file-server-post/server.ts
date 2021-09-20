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

  if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end();
    return;
  }

  switch (req.method) {
    case 'POST': {
      req
        .pipe(new LimitSizeStream({ limit: 1048576 }))
        .on('error', (err: LimitExceededError) => {
          if (err.code === 'LIMIT_EXCEEDED') {
            res.statusCode = 413;
            res.end();
          }
        })
        .pipe(fs.createWriteStream(filepath))
        .on('error', () => {
          res.statusCode = 500;
          res.end('Server is not');
        })
        .on('close', () => {
          res.end();
        });

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
