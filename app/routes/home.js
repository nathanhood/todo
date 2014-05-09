'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Ta-Da Home'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};
