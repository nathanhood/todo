'use strict';

var traceur = require('traceur');
var routeDebugger = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');

  app.all('*', routeDebugger);
  app.get('/', home.index);
  app.get('/help', home.help);
  console.log('Routes Loaded');
  fn();
}
