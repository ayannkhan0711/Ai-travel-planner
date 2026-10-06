const morgan = require('morgan');

// Custom logging format matching luxury aesthetic and structured diagnostics
const loggerMiddleware = morgan((tokens, req, res) => {
  const status = tokens.status(req, res);
  const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
  const reset = '\x1b[0m';

  return [
    `\x1b[36m[Voyager Luxe API]\x1b[0m`,
    tokens.method(req, res),
    tokens.url(req, res),
    `${color}${status}${reset}`,
    '-',
    tokens['response-time'](req, res),
    'ms',
    `(${tokens.res(req, res, 'content-length') || 0} bytes)`
  ].join(' ');
});

module.exports = loggerMiddleware;
