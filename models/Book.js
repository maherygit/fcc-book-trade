const Mongoose = require('mongoose');

const BookSchema = Mongoose.Schema({
  title: String,
  author: String,
  toTrade: Boolean,
  traded: Boolean,
  ownedBy: {
    type: Mongoose.Schema.ObjectId, 
    ref: 'booktrade_User'
  }
});

module.exports = Mongoose.model('booktrade_Book', BookSchema);