const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const app = express(); // the actual Express application
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(() => {
    logger.info('failed to connect to MongoDB');
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
