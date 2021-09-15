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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;


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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;

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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;



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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;




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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;



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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;


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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;

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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
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

  /* if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('File not found');
    return;
  } */

  switch (req.method) {
    case 'POST':{
      console.log();
      /* fs.createReadStream(req.headers.bo)
        .pipe()


      fs.createWriteStream(filepath)
        .pipe(res) */

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;