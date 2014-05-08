'use strict';

var util = require('util');

module.exports = (req, res, next)=>{

  util.log('---NEW REQUEST FROM BROWSER---');
  console.log(util.format('%s: %s', 'URL    ', req.url));
  console.log(util.format('%s: %s', 'VERB   ', req.method));
  console.log(util.format('%s: %s', 'PATH   ', req.path));
  console.log('*** * *** * *** * *** * *** * ***');
  console.log(util.format('%s: %s', 'HEADERS', util.inspect(req.headers)));
  console.log(util.format('%s: %s', 'QUERY  ', util.inspect(req.query)));
  console.log(util.format('%s: %s', 'BODY   ', util.inspect(req.body)));

  next();
};
