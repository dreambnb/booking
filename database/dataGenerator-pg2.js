const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


const generateData = () => {
  const listing = {};
  let text = '';
  let line = '';


  for (let t = 999; t >=0; t--) {
    text = '';

    for (let i = 10000; i > 0; i--) {

      line = '';
      const checkin = faker.date.between('2018-05-05', '2019-05-05').toISOString();
      const length = Math.floor(Math.random() * 10);
    
      line += (t * 10000) + i + '|';
      line += Math.floor(Math.random() * 5000000) + '|';      
      line += checkin + '|';
      line += length + '|';
      line += (addDays(checkin, length)).toISOString() + '|';
      line += Math.floor(Math.random() * 10000000);

      text += `${line}\n`;
    }


    try {
      fs.appendFileSync('./seedBookingDataPG.txt', text);
    } catch (err) {
      /* Handle the error */
      console.log('err', err);
    }
  }
};

generateData();