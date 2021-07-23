const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const User = require('../models/User');
const  jwtAPI = require('../utils/security/jwt');
const passwordAPI = require('../utils/security/password');

const error500 = (message, response) => {
  console.log(message);
  return response.status(500).json({ error : message});
}


// lists all the users
router.get('/', async (req, res) => {
  try{
    console.log("getting the users list");
    const users = await User.find({});
    if(!users.length){ 
     return res.json({message : "no users available"});
    } else {
      console.log("backend users", users)
      return res.json({ users });
    }
  } catch(err){
    console.log("error while getting the users list", err.stack);
    return error500(err, res)
  }
});

router.delete('/', async (req, res) => {
  try{
    console.log("deleting the users list");
    const deletionResults = await User.deleteMany({});
    console.log("users cleared");
      res.json(deletionResults);
  } catch(err){
    console.log("error clearing the users", err.stack);
    return error500(err, res)
  }
});


// register user
router.post('/register', async (req, res) => {
  // TODO check the validity of email and password
  try{
    console.log("registering : ", req.body)
    // search if user alreadt exists
    User.find({ email: req.body.email }, (err, users) => {
      if(err){
        const mess = 'an error occured while registering user (find existing)';
        console.log(mess);
        return res.status(500).json({ error : mess});
      }
      // user already exist
      if(users.length > 0){
        return error500('User already exists', res)
      }
      // create a new user
      const registeringUser = new User({
        email: req.body.email,
        // TODO: encrypt password for saving
        password: req.body.password,
        name: req.body.name || ""
      });
      registeringUser.save((err, savedUser) => {
        if (err) {
          return error500('Error while saving the user in db', res)
        }
        console.log("user saved!");
        console.log("generating a token for the user");
        // TODO: put a duration to the token
        const token = jwtAPI.getToken({ email : savedUser.email });
        savedUser.token = token;
        return res.status(200).json(savedUser);
      });
    });
  } catch(err){
    console.log(err.stack);
  }
});

// login user
router.put('/login', async (req, res) => {
  // TODO check the validity of email and password
  try{
    console.log("login : ", req.body)
    // search if user exists
    User.findOne({ email: req.body.email }, (err, user) => {
      if(err){
        return error500('an error occured while login user (find existing)', res)
      }
      // user found
      if(user === null || !user) {
        return error500('User not found', res)
      }
      // Check the password
      // TODO : remove crypt after crypting password is OK
      if(password.checkPassword(req.body.password, passwordAPI.cryptPassword(user.password))){
        console.log("user logged in!");
        console.log("generating a token for the user");
        const token = jwtAPI.getToken({ email : user.email });
        user.token = token;
        return res.status(200).json(savedUser);
      } else {
        return error500('Login failed, wrong user or password', res)
      }
    });
  } catch(err){
    console.log(err.stack);
  }
});



module.exports = router;