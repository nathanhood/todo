'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');//importing lodash into this file so we can use lodash methods

var tasks = global.nss.db.collection('tasks');
var priorities = global.nss.db.collection('priorities');

exports.index = (req, res)=>{
  tasks.find().toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{ //passing in arrays from both tasks and priorities collections

      tasks = tasks.map(task=> {
        var priority = _(priorities).find(pri=>pri._id.toString() === task.priorityId.toString()); //var priority will return object that correlates to priorityId in task
           //object ids cannot be compared in mongo id format/.toString()
          task.priority = priority;
          return task;
      });

      res.render('tasks/index', {tasks: tasks, priorities: priorities, title: 'Tasks'});//rendering both to tasks' index.jade
    });
  });
};


exports.create = (req, res)=>{
  console.log('BEFORE');
  console.log(req.body);

  req.body.isComplete = false;
  req.body.due = new Date(req.body.due);//built in constructor that will convert string into date
  req.body.priorityId = Mongo.ObjectID(req.body.priorityId);

  console.log('AFTER');
  console.log(req.body);//shows how we manipulated data from req.body

  tasks.save(req.body, ()=>{//this is what I was looking for with confirmation page
    res.redirect('/tasks');
  });
};


exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);

  tasks.findAndRemove({_id:_id}, ()=>{
    res.redirect('/tasks');
  });
};


exports.update = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);

  tasks.findOne({_id:_id}, (e,t)=>{
    t.isComplete = !t.isComplete;//will toggle isComplete value of true or false

    tasks.save(t, ()=>res.redirect('/tasks'));
  });
};


exports.filter = (req, res)=>{
  var _pid = Mongo.ObjectID(req.params.pid);

  tasks.find({priorityId:_pid}).toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{ //passing in arrays from both tasks and priorities collections

      tasks = tasks.map(task=> {

        var priority = _(priorities).find(pri=>pri._id.toString() === task.priorityId.toString()); //var priority will return object that correlates to priorityId in task
           //object ids cannot be compare in mongo id format
          task.priority = priority;
          return task;

      });


      res.render('tasks/index', {tasks: tasks, priorities: priorities, title: 'Tasks'});//rendering both to tasks' index.jade
    });
  });

};


exports.datesort = (req, res)=>{

  tasks.find({}, {sort:[['due', 1]]}).toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{ //passing in arrays from both tasks and priorities collections

      tasks = tasks.map(task=> {

        var priority = _(priorities).find(pri=>pri._id.toString() === task.priorityId.toString()); //var priority will return object that correlates to priorityId in task
           //object ids cannot be compare in mongo id format
          task.priority = priority;
          return task;

      });


      res.render('tasks/index', {tasks: tasks, priorities: priorities, title: 'Tasks'});//rendering both to tasks' index.jade
    });
  });

};


exports.titlesort = (req, res)=>{
  tasks.find({}).sort({title: 1}).toArray((err, t)=>{
    priorities.find().toArray((err, p)=>{

      t = t.map(task=>{
        task.priority = _(p).find(pri=>pri._id.toString() === task.priorityId.toString());
        return task;
      });
      res.render('tasks/index', {tasks: t, priorities: p, title: 'Tasks'});
    });
  });
};
