const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const User = require('../models/User');
const  jwtAPI = require('../utils/security/jwt');


// lists all the users
router.get('/', async (req, res) => {
  try{
    console.log("getting the users list");
    const users = await User.find({});
    if(!users.length){ 
     res.json({message : "no users available"});
    } else {
      console.log("backend users", users)
      res.json({ users });
    }
  } catch(err){
    console.log("error while getting the users list", err.stack);
    res.status(500).json(err);
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
    res.status(500).json(err);
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
        const mess = 'User already exists';
        console.log(mess);
        return res.status(500).json({ error : 'User already exists'});
      }
      // create a new user
      const registeringUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name || ""
      });
      registeringUser.save((err, savedUser) => {
        if (err) {
          const mess = 'Error while saving the user in db'
          console.log(mess);
          return res.status(500).json({ error : mess});
        }
        console.log("user saved!");
        console.log("generating a token for the user");
        const token = jwtAPI.getToken({ email : savedUser.email });
        savedUser.token = token;
        return res.status(200).json(savedUser);
      });
    });
  } catch(err){
    console.log(err.stack);
  }
});

// register user
router.put('/register/:id', async (req, res) => {
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
        const mess = 'User already exists';
        console.log(mess);
        return res.status(500).json({ error : 'User already exists'});
      }
      // create a new user
      const registeringUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name || ""
      });
      registeringUser.save((err, savedUser) => {
        if (err) {
          const mess = 'Error while saving the user in db'
          console.log(mess);
          return res.status(500).json({ error : mess});
        }
        console.log("user saved!");
        console.log("generating a token for the user");
        const token = jwtAPI.getToken({ email : savedUser.email });
        savedUser.token = token;
        return res.status(200).json(savedUser);
      });
    });
  } catch(err){
    console.log(err.stack);
  }
});



module.exports = router;