// connect express
const express = require('express');
const app = express();
// CORS
const cors = require('cors');
app.use(cors());

const path = require('path');
const port = process.env.PORT || 7777;
const responseTime = require('response-time');
const redis = require('redis');

// create a new redis client and connect to the local redis instance
// For docker 
// const client = redis.createClient('6379', '172.17.0.2');
// For local
const client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// set up the response-time middleware
app.use(responseTime());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// serve client files
app.use(express.static(path.join(__dirname, '/../client/dist')));

// import DB
const db = require('../database');

// GET request
app.get('/booking/:room_id', (req, res) => {

  // get the room id parameter in the URL
  let id = req.params.room_id;
  // use the redis client to get room info from redis cache
  client.get(id, (error, result) => {
    if(result){
    // the result exists in cache - return it to our user immediately
    res.send(JSON.parse(result)); 
    } else {
      // if there's no cached room data, get it from db
      db.findOne(req.params.room_id, (error, data) => {
        if (error) {
          res.sendStatus(404);
          res.send(error);
        } else {
          // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
          client.setex(id, 60, JSON.stringify(data));
          res.send(data);
        }
      });
    }
  });

});


// POST request
app.post('/booking', (req, res) => {
  db.update(req.body, (error, data) => {
    if (error) {
      res.sendStatus(404);
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));


// export module
module.exports = app;
