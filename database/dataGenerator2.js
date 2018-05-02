const faker = require('faker');
const db = require('./index.js');

let room_id = 1;

// let room_name= faker.address.streetAddress(); // random contact card containing many properties
// let room_rate = Math.floor(Math.random() * 500);
// let host_name = faker.name.firstName(); // Rowan Nikolaus
// let guest_name = faker.name.firstName(); 

let listing = {
  room_id: room_id,
  room_name: faker.address.streetAddress(),
  room_rate: Math.floor(Math.random() * 500),
  host_name: faker.name.firstName(),
  guest_name: faker.name.firstName(), 
  review_count: Math.floor(Math.random() * 200),
  review_grade: +(Math.random() * 5).toFixed(2)
}

// console.log(db.create(listing));



for (let i=0; i<1000; i++) {
  let collection = [];
  for (let t=0; t<10000; t++) {
    let listing = {
      room_id: t,
      room_name: faker.address.streetAddress(),
      room_rate: Math.floor(Math.random() * 500),
      host_name: faker.name.firstName(),
      guest_name: faker.name.firstName(), 
      review_count: Math.floor(Math.random() * 200),
      review_grade: +(Math.random() * 5).toFixed(2)
    };

    let listingDoc = db.create(listing);
    collection.push(listingDoc);

    
  
  }
  db.save(collection, (err, rooms) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('success', i)
    }
  })

}


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

//mlab versus mongo? 