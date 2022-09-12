require('dotenv').config();
require('colors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// connect to db & listening for requests
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`connected to ${conn.connection.host}`.black.bgMagenta);
    // listen to port
    app.listen(port, () => {
      console.log(`listening for requests on port: ${port}`.bgRed);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use('/api', require('./routes/index'));

// -------------------- deployment -------------------

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.send('Welcome to the memroy game API');
  });
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// -------------------- deployment -------------------
