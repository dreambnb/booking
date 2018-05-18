require('newrelic');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const responseTime = require('response-time');
const redis = require('redis');
const db = require('../database/indexPG.js');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

// For docker 
// const client = redis.createClient('6379', '172.17.0.2');
// For local
// const client = redis.createClient();
// for docker compose file
// const redisHost = process.env.REDIS_HOST || 'localhost';
// const client = redis.createClient('6379', redisHost);
//for separate ec2 instance of redis
const client = redis.createClient('6379', 'ec2-54-208-162-120.compute-1.amazonaws.com');

client.on('error', (err) => {
  console.log("Error in redis " + err);
});

if (cluster.isMaster && cpuCount > 1) {
  console.log(`Master ${process.pid} started`);
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    if (code) {
      console.log(`Worker ${worker.process.pid} killed by error, code ${code}`);
    } else {
      console.log(`Worker ${worker.process.pid} exited`);
    }
  });
} else {
  
  const app = express();
  const port = process.env.PORT || 7777;
  app.use(cors());
  app.use(morgan('dev'));
  app.use(responseTime());
  app.use(bodyParser.json());
  
  
  
  app.use('/:room_id', express.static(path.join(__dirname, '/../client/dist')));
  
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
            res.end(error);
          } else {
            // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
            client.setex(id, 60, JSON.stringify(data));
            res.send(data);
          }
        });
      }
    });
  
  });
  
  // //without redis
  // app.get('/booking/:room_id', (req, res) => {
  //   // get the room id parameter in the URL
  //   let id = req.params.room_id;
   
  //       // if there's no cached room data, get it from db
  //       db.findOne(req.params.room_id, (error, data) => {
  //         if (error) {
  //           res.sendStatus(404);
  //           res.send(error);
  //         } else {
  //           // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
  //           // client.setex(id, 60, JSON.stringify(data));
  //           res.send(data);
  //         }
  //       });
  // });
  
  
  app.post('/booking', (req, res) => {
    db.update(req.body, (error, data) => {
      if (error) {
        res.sendStatus(404);
        res.end(error);
      } else {
        res.send(data);
      }
    });
  });
  
  app.listen(port, () => console.log(`Worker ${process.pid} listening on ${port}`));

}