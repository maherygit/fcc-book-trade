const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const Book = require('../models/Book');


// lists all the books
router.get('/', async (req, res) => {
  try{
    console.log('retrieving books');
    const books = await Book.find({});
    if(!books.length) { 
      console.log('no book available')
      res.json({ message: "no book available" });
    } else {
      res.json(books);
    }
  } catch(err){
    console.log(err.stack);
  }
});

router.delete('/', async (req, res) => {
  try{
    console.log('deleting all books');
    const deletingResults = await Book.deleteMany({});
    console.log('books list cleared');
    res.json({ status: 'OK', details: deletingResults } )
  } catch(err){
    console.log('error deleting books')
    console.log(err.stack);
    res.status(500).json(err);
  }
});


module.exports = router;