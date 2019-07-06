const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose');

/*************************************List all Students ****************************** */
//route list all students
router.get('/list', function(req, res) {    
  Student.find({}, function (err, students) {
     res.render('student/list', {
      students
    });
  });
});
/*************************************Delete Student ****************************** */
//Delete Student By ID
router.get('/delete/(:id)', function(req, res) {
  var o_id = new ObjectId(req.params.id);
  Student.deleteOne({_id: o_id}).then(user =>{
    res.redirect('/student/list');
  });
});
/*************************************Edit Current Student ****************************** */
//route Edit One Student
router.get('/edit/(:id)', function(req, res) {
  const o_id = new ObjectId(req.params.id);
  Student.findOne({_id: o_id}, function (err, student) {
    res.render('student/edit', {
      student
    });
  });
});

// edit Student by ID
router.post('/edit/(:id)', (req, res) => {
  const {firstName, lastName, teacher, district} = req.body;
  const o_id = new ObjectId(req.params.id);
  
  let errors = [];
  
  if (!firstName || !lastName || !teacher ||!district) {
    errors.push({ msg: 'Please enter all fields' });
  }
  
  if (errors.length > 0) {
    console.log(errors);
    res.render('edit', {errors, firstName, lastName, teacher, district });
  } 
  else {
    mongoose.set('useFindAndModify', false);
    Student.findByIdAndUpdate(o_id,{ firstName: firstName, lastName: lastName, teacher: teacher, district: district}).then(user => {
      res.redirect('/student/list');
    });
  }
});  
/*************************************Create New Student****************************** */
//route Make new Student
router.get('/new', (req, res) => {
  res.render('student/new', {
  });
});

//add New Student
router.post('/new', (req, res) => {
  const {firstName, lastName, teacher, district} = req.body;
  
  let errors = [];
  
  if (!firstName || !lastName || !teacher || !district)  {
    errors.push({ msg: 'Please enter all fields' });
  }
  
  if (errors.length > 0) {
    console.log(errors);
    res.render('/new', {errors, firstName, lastName, teacher, district});
    } 
    else {
      Student.findOne({ firstName: firstName, lastName: lastName}).then(user => {
      if (user) {
        errors.push({ msg: 'Student already exists' });
        res.render('student/new', {errors, firstName, lastName, teacher, district });
      } 
      else {
        const newStudent = new Student({ firstName, lastName, teacher, district });
        newStudent
        .save()
        .then(newStudent => {
          res.redirect('/student/list');
        })
        .catch(err => console.log(err));
      }
    });
  }
});

module.exports = router;