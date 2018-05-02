// create a connection
const mongoose = require('mongoose');

// mongoose.connect(`mongodb://${config.DB_ID}:${config.DB_PASSWORD}@ds141889.mlab.com:41889/booking`);
mongoose.connect('mongodb://127.0.0.1:27017/dreambnb');


const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected!');
});

// create a schema for DB data
const bookingSchema = mongoose.Schema({

  room_id: Number,
  room_name: String,
  room_rate: Number,
  booked_dates: [String], // store booked dates in an array
  guest_name: String, 
  host_name: String,
  review_count: Number,
  review_grade: Number,
});

// create a model for the schema
const Room = mongoose.model('room', bookingSchema, 'listings');

// adding booking dates to DB (only booked_dates)
const update = (data, callback) => {

  let newBooking = {
    room_id: data.id,
    booked_dates: data.booked,
    // guest_number: data.guest_number,
    guest_name: data.guest_name,
  };

  Room.findOneAndUpdate({ room_id: data.id }, { $push: { booked_dates: data.booked } }, (err, room) => {
    if (err) {
      callback(err, null);
      return console.error(err);
    }
    callback(null, room);
  });
};


// fetching all room data from DB
const find = (callback) => {
  Room.find((err, rooms) => {
    if (err) return console.error(err);
    callback(rooms);
  });
};


// fetching one specific room data from DB
const findOne = (id, callback) => {
  Room.findOne({ room_id: id }).exec((err, room) => {
    if (err) {
      callback(err, null);
      return console.error(err);
    }
    callback(null, room);
  });
};

findOne(9999, (err, room) => {
  console.log('here it is', err, room);
});

// Room.find((err, listings) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('here are the listings', listings);
//   }
// });

module.exports = {
  update,
  find,
  findOne,
};
