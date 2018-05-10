// connect express
require('babel-register')
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})

require('newrelic');
import React from 'react';
import { renderToString } from "react-dom/server";
import Booking from '../client/src/components/Booking.jsx';

const express = require('express');
const app = express();
// CORS
const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');
const port = process.env.PORT || 7777;
const responseTime = require('response-time');
const redis = require('redis');

// import DB
const db = require('../database/indexPG.js');

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
app.get("*", (req, res, next) => {
  console.log('context', context);
  const markup = renderToString(
    <Booking room={5}/>
  )
  res.send(`
  <!DOCTYPE html>
  <html>
  
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Booking Request</title>
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,400i,500,500i,600,600i,700,700i|Open+Sans|Roboto" rel="stylesheet">
    <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/fantasybnb-mo/_datepicker.css"></link>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg"
      crossorigin="anonymous">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  
  <body>
    <div id="booking">${markup}</div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </body>
  
  </html>
  `)
})

// app.use('/:room_id', express.static(path.join(__dirname, '/../client/dist')));



// // GET request
// app.get('/booking/:room_id', (req, res) => {
//   // get the room id parameter in the URL
//   let id = req.params.room_id;
//   // use the redis client to get room info from redis cache
//   client.get(id, (error, result) => {
//     if(result){
//     // the result exists in cache - return it to our user immediately
//     res.send(JSON.parse(result)); 
//     } else {
//       // if there's no cached room data, get it from db
//       db.findOne(req.params.room_id, (error, data) => {
//         if (error) {
//           res.sendStatus(404);
//           res.send(error);
//         } else {
//           // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
//           client.setex(id, 60, JSON.stringify(data));
//           res.send(data);
//         }
//       });
//     }
//   });

// });

// //without redis
// // app.get('/booking/:room_id', (req, res) => {
// //   // get the room id parameter in the URL
// //   let id = req.params.room_id;
// //   // use the redis client to get room info from redis cache
 
// //       // if there's no cached room data, get it from db
// //       db.findOne(req.params.room_id, (error, data) => {
// //         if (error) {
// //           res.sendStatus(404);
// //           res.send(error);
// //         } else {
// //           // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
// //           client.setex(id, 60, JSON.stringify(data));
// //           res.send(data);
// //         }
// //       });
// // });


// // POST request
// app.post('/booking', (req, res) => {
//   db.update(req.body, (error, data) => {
//     if (error) {
//       res.sendStatus(404);
//       res.end(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

// listen to the port
app.listen(port, () => console.log(`Server is listening to port ${port}`));


// export module
// module.exports = app;
