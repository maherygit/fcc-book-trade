const express = require('express');
const usersRouter = require('./usersRouter');
const booksRouter = require('./booksRouter');

module.exports = function(app) {
  app.use('/users', usersRouter);
  app.use('/books', booksRouter);
};