require('dotenv').config();
const cors = require('cors') 

// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const routeApp = require('./routes/api');
const Mongoose = require('mongoose');
const path = require('path');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, './client/build')));

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
*/
app.use(cors())

routeApp(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});
/*
app.get("/*", (req, res) => {
  console.log("sending : ", path.resolve(__dirname, './client/build', 'index.html'))
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
*/




Mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
    console.log("connected to db");
    // listen for requests :)
    const listener = app.listen(process.env.PORT, function() {
      console.log("Your app is listening on port " + listener.address().port);
    });
  })
  .catch(err => {
    console.log("failed to connect to db");
    throw err;
  });

