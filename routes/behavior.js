const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose');


/*************************************Add Behavior to Student ****************************** */

//Delete one Behavior
router.get('/delete/(:studentid)/(:behaviorid)', function(req, res) {
    const o_id = new ObjectId(req.params.studentid);
    const b_id = new ObjectId(req.params.behaviorid);

    Student.updateOne(
      {}, 
      { "$pull": { "behavior": {"_id": b_id}}},
      { multi: true }).then(student =>{
        Student.findOne({_id: o_id}, function (err, student) {
          res.render('behavior/edit', {
            student
          });
      }).catch(error =>{
        console.log(error)
      });
    });  
  });
  
  //Edit One Behavior of Student
  router.post('/edit/(:studentid)/(:behaviorid)', (req, res) => {
    const {behavior} = req.body;
    const o_id = new ObjectId(req.params.studentid);
    const b_id = new ObjectId(req.params.behaviorid);
  
    Student.updateOne(
      { "_id" :o_id, "behavior._id": b_id }, 
      { "$set": { "behavior.$.name": behavior }}, 
      function(err, company) {
        if(err) console.log(err);
        else{
          console.log("Behavior Changed");
          res.redirect('/behavior/add/' + o_id);
        }
    });
  });
  
  //route Add a Behavior
  router.get('/add/(:id)', function(req, res) {
    var o_id = new ObjectId(req.params.id);
    Student.findOne({_id: o_id}, function (err, student) {
      res.render('behavior/edit', {
        student
      });
    });
  });
    
  //Add Behavior to Student By ID
  router.post('/add/(:id)', (req, res) => {
    const {behavior} = req.body;
    const o_id = new ObjectId(req.params.id);
    
    let errors = [];
    
    if (!behavior) {
      errors.push({ msg: 'Please enter a behavior' });
    }
    
    if (errors.length > 0) {
      console.log(errors);
      res.redirect('/behavior/add/' + o_id);
    } 
    else {
      mongoose.set('useFindAndModify', false);
      Student.findByIdAndUpdate(o_id,{ $push:{behavior: {name: behavior} }}).then(user => {
        res.redirect('/behavior/add/' + o_id);
      });
    }
  });

module.exports = router;