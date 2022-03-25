const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const app = express(); // the actual Express application
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(() => {
    console.log('not conncected');
  });

app.use(cors());
app.use(express.json());

app.use('/api/notes', blogsRouter);

module.exports = app;
