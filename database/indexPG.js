const { Client } = require('pg');
const moment = require('moment');

const client = new Client({
  // host: process.env.DB_HOST || 'localhost',
  host: 'mydb.cguytmskjm2m.us-east-1.rds.amazonaws.com',
  user: 'jennqiao',
  password: 'mypostgres',
  database: 'dreambnb',
  port: 5432,
});

client.connect();

const enumerateDaysBetweenDates = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate);
  const lastDate = moment(endDate);

  do {
    dates.push(moment(currDate.clone().toDate()));
  } while (currDate.add(1, 'days').diff(lastDate) < 0);

  return dates;
};


const findOne = (id, callback) => {
  const today = new Date().toISOString();
  const end = moment().add(365, 'days').toISOString();
  client.query(`select * from bookings where listing_id = ${id} and checkout BETWEEN to_date('${today}', 'YYYY-MM-DD') AND to_date('${end}','YYYY-MM-DD')`, (err, res) => {
    if (err) {
      callback(err.stack, null);
    } else {
      let dates = [];
      for (let i = 0; i < res.rows.length; i++) {
        dates = dates.concat(enumerateDaysBetweenDates(res.rows[i].checkin, res.rows[i].checkout));
      }

      client.query(`select * from rooms where room_id = ${id}`, (err, res) => {
        if (err) {
          callback(err.stack, null);
        } else {
          const room = res.rows[0];
          room["booked_dates"] = dates;
          callback(null, room);
        }
      });
    }
  });
};

const update = (data, callback) => {
  let checkin = data.checkin;
  let checkout = data.checkout;
  let query = `INSERT INTO bookings (user_id, checkin, checkout, length, listing_id)
  VALUES (${data.user_id}, '${checkin}', '${checkout}', ${data.length}, ${data.listing_id})`;
  client.query(query, (err, res) => {
    if (err) {
      callback(err.stack, null);
    } else {
      const room = res.rows[0];
      callback(null, room);
    }
  });
};

// findOne(9999978);

// const findOne = (id, callback) => {
//   Room.findOne({ room_id: id }).exec((err, room) => {
//     if (err) {
//       callback(err, null);
//       return console.error(err);
//     }
//     callback(null, room);
//   });
// };


// const results = enumerateDaysBetweenDates(startDate, endDate);
// console.log(results);
// console.log('year',  moment().add(365, 'days').toISOString())

module.exports = {
  update,
  findOne,
};

