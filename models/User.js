const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  city: String,
  state: String,
  requests: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_BookRequest'
  }],
  booksList: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_Book'
  }]  
});

module.exports = Mongoose.model('booktrade_User', UserSchema);