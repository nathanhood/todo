'use strict';

var Mongo = require('mongodb');

var priorities = global.nss.db.collection('priorities');

exports.index = (req, res)=>{
  priorities.find().toArray((err, records)=>{
    res.render('priorities/index', {priorities: records, title: 'Priorities'});
  });
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);

  priorities.findAndRemove({_id:_id}, ()=>{//can leave callback function blank if you don't care about the error or the return object
    res.redirect('/priorities');
  });
};


exports.create = (req, res)=>{
  priorities.save(req.body, ()=>res.redirect('/priorities'));
};
