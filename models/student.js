const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  behavior: [{
    name: String,
    required:false
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
