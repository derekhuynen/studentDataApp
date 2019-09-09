const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Log = require('../models/log');
const ObjectId = require('mongodb').ObjectId

const array = ['8:00', '8:30', '9:00', '9:30', '10:00','10:30','11:00','11:30','12:00', '12:30', '1:00', '1:30', '2:00', '2:30','3:00','3:30','4:00'];



//Delete One Day of Data
router.get('/delete/(:studentid)/(:logid)', function(req, res) {
  const o_id = new ObjectId(req.params.studentid);
  const log_id = new ObjectId(req.params.logid);
  Log.deleteOne({_id: log_id}).then(user =>{
    console.log("deleted");
    res.redirect('/data/list/' + o_id)
  });
});


//List all data for this Student
router.get('/list/(:id)', function(req, res) {
  var o_id = new ObjectId(req.params.id);
  Student.findOne({_id: o_id}, function (err, student) {
    Log.find({studentId: o_id}, function (err, logs) {
      res.render('data/list', {
        student,
        array,
        logs
      });
    });
  });
});

//View Data for A Adte For A Student
router.get('/view/(:studentid)/(:logid)', function(req, res) {
    var o_id = new ObjectId(req.params.studentid);
    var log_id = new ObjectId(req.params.logid);
    Student.findOne({_id: o_id}, function (err, student) {
      Log.findOne({_id: log_id}, function (err, log) {
        res.render('data/view', {
          student,
          array,
          log
      });
    });
  });
});

//Load PAge for New Data
router.get('/add/(:id)', function(req, res) {
  var o_id = new ObjectId(req.params.id);
  Student.findOne({_id: o_id}, function (err, student) {
    res.render('data/input', {
    array,
    student
    });
  });
});

  //Add New Daily Data for Student
router.post('/add/(:studentid)', (req, res) => {
  const o_id = new ObjectId(req.params.studentid);
  const {days} = req.body;
    
  Student.findOne({_id: o_id}, function (err, student) {
    const values = Object.values(req.body);
    let behaviors = [];

    student.behavior.forEach(foreach => {
      behaviors.push(foreach._id);
    });

    const newLog= new Log({ 
      date: days,
      studentId: student._id,
      behaviors: behaviors,
      behavior: [] 
    });
    
    //Saving Data in Data Base
    let counterNumber = 0;
    for( var time of array){ 
      for(behavior of student.behavior){
      newLog.behavior.push({time: time, name: behavior.name, count: values[counterNumber], counter: counterNumber});
      counterNumber++
      };
    };
    counterNumber = 0;
    //************************ */

    newLog
    .save()
    .then(newLog => {
      console.log("added")
        res.redirect('/data/list/' + o_id);
    })
    .catch(err => console.log(err));
  });
});

module.exports = router;