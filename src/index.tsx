import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


// const api_url = 'https://edu.evgeniychvertkov.com/';
// const api_key =  'api5613e3024e96f2eee62f63bd1d9196d624f4de63384d5dd35c515933e944d18a';

let url = "https://edu.evgeniychvertkov.com/v1/driver/2/";

fetch(url, {
  method: "PUT",
  headers: {
    "Accept" : "application/json",
    "X-Authorization": "api13ea3305989c1bbf4aa08d52b09fb239dbd0c27bd13daa1227861f55af160b34",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    first_name: "Vlad",
     last_name: "Koretskiy",
     date_birth: 1637147585649,
     status: {title: "Активный", code: "active"},
  })
})
  .then(resp => resp.json())
  .then(data => console.log(data))

ReactDOM.render(
  <React.StrictMode>
      
  </React.StrictMode>,
  document.getElementById('root')
);


// let url = "https://edu.evgeniychvertkov.com/v1/car/2/";

// fetch(url, {
//   method: "PATCH",
//   headers: {
//     "Accept" : "application/json",
//     "X-Authorization": "api13ea3305989c1bbf4aa08d52b09fb239dbd0c27bd13daa1227861f55af160b34",
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//      model: "X7",
//        mark: "BMW",
//        number: "12345678",
//        year: 1997,
//        driver_id: 2,
//        status: {title: "Стандарт", code: "standart"}
//   })
// })
//   .then(resp => resp.json())
//   .then(data => console.log(data))
  