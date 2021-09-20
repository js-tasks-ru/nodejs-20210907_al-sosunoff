import url, { URL } from 'url';
import http from 'http';
import path from 'path';
import fs from 'fs';

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
    case 'DELETE': {
      // fs.Promises.rm
      fs.unlink(filepath, (error) => {
        if (!error) {
          res.end('good');
        } else {
          if (error.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('file not found');
          } else {
            res.statusCode = 500;
            res.end();
          }
        }
      });
      break;
    }
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
