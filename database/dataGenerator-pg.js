const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');


const generateData = () => {
  const listing = {};
  let text = '';
  let line = '';



  for (let t = 999; t >=0; t--) {
    text = '';

    for (let i = 10000; i > 0; i--) {

      line = '';
      line += (t * 10000) + i + '|';
      line += faker.address.streetAddress() + '|';      
      line += Math.floor(Math.random() * 500) + '|';
      line += faker.name.firstName() + '|';
      line += faker.name.firstName() + '|';
      line += Math.floor(Math.random() * 200) + '|';
      line += +(Math.random() * 5).toFixed(2);

      text += `${line}\n`;
    }


    try {
      fs.appendFileSync('./seedDataPG.txt', text);
    } catch (err) {
      /* Handle the error */
      console.log('err', err);
    }
  }
};

// generateData();