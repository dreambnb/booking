const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const generateData = () => {
  const booking = {};
  let text = '';

  for (let t = 999; t >=0; t--) {
    text = '';

    for (let i = 10000; i > 0; i--) {
      booking.id = (t * 10000) + i;
      booking.user_id = Math.floor(Math.random() * 5000000);
      booking.checkin = faker.date.between('2018-05-05', '2019-05-05');
      booking.year = booking.checkin.getFullYear();
      booking.length = Math.floor(Math.random() * 10);
      booking.checkout = addDays(booking.checkin, booking.length);
      booking.listing_id = Math.floor(Math.random() * 10000000);

      text += `${JSON.stringify(booking)}\n`;
    }


    try {
      fs.appendFileSync('./seedBookingData2.json', text);
    } catch (err) {
      /* Handle the error */
      console.log('err', err);
    }
  }
};

generateData();
