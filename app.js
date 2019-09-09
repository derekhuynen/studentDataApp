const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//express Layout and set view
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Routes
app.use('/', require('./routes/index.js'));
app.use('/student', require('./routes/student.js'));
app.use('/behavior', require('./routes/behavior.js'));
app.use('/data', require('./routes/data.js'));


//Start Server
app.listen(4000, () => console.log('App Started on port:4000'));

module.exports = router;