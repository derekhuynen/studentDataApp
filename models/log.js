const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

  date: {
    type: String,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  behaviors: [String],
  behavior: [{
    time: String,
    name: String,
    count: Number,
    counter: Number
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', studentSchema);

module.exports = Log;
