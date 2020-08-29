const Mongoose = require('mongoose');

const BookRequestSchema = Mongoose.Schema({
  state: String,
  dateOfRequest: Date,
  dateOfTrade: Date,
  dateOfFulfiled: Date,
  book: {
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_Book'
  },
  user: {
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_User'
  },
});


module.exports = Mongoose.model("booktrade_BookRequest", BookRequestSchema);