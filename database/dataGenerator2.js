const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');

// let listing = {
//   room_id: room_id,
//   room_name: faker.address.streetAddress(),
//   room_rate: Math.floor(Math.random() * 500),
//   host_name: faker.name.firstName(),
//   guest_name: faker.name.firstName(),
//   review_count: Math.floor(Math.random() * 200),
//   review_grade: +(Math.random() * 5).toFixed(2),
// }

const generateData = () => {
  const listing = {};
  let text = '';

  for (let t = 999; t >=0; t--) {
    text = '';

    for (let i = 10000; i > 0; i--) {
      listing.room_id = (t * 10000) + i;
      listing.room_name = faker.address.streetAddress();
      listing.room_rate = Math.floor(Math.random() * 500);
      listing.host_name = faker.name.firstName();
      listing.guest_name = faker.name.firstName();
      listing.review_count = Math.floor(Math.random() * 200);
      listing.review_grade = +(Math.random() * 5).toFixed(2);

      text += `${JSON.stringify(listing)}\n`;
    }


    try {
      fs.appendFileSync('./seedData.json', text);
    } catch (err) {
      /* Handle the error */
      console.log('err', err);
    }
  }
};

generateData();


const writeToMongo = () => {



}

// fs.writeFile('./seedData.txt', text, 'utf8', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');

// })


// room_id: Number,
// room_name: String,
// world_name: String, //not used
// keywords: String, // not used
// room_rate: Number,
// booked_dates: [String], // store booked dates in an array
// // in the future, booked_dates can be [checkin, checkout, guestnumber]
// guest_number: Number, //not used
// guest_name: String,
// host_name: String,
// discount: Boolean, //not used
// cleaning_fee: Boolean,
// review_count: Number,
// review_grade: Number,
// // rare = true or false ?
// created_date: { type: Date, default: Date.now },

// mlab versus mongo?
