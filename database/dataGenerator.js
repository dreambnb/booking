// this file is only for generating starter data - it doesn't have a connection with DB


// import csv data
const fs = require('fs');

const path = require('path');

// saving generated data

const listings = fs.readFileSync(path.join(__dirname, '../starterData.csv'), 'utf8');
const listingsArray = listings.toString().split('\n');

listingsArray.forEach((room) => {
  
  let each = room.split(',');
  let newRoom = new Room;
  newRoom.room_id = each[2];
  newRoom.room_name = each[0];
  newRoom.world_name = each[1];
  newRoom.room_rate = each[3];
  newRoom.host_name = each[4];
  newRoom.guest_number = each[5];
  newRoom.review_count = each[7];
  newRoom.review_grade = each[8];

  newRoom.save((err, newRoom) => {
    if (err) return console.error(err);
    console.log('Saved', newRoom);
  });

});
