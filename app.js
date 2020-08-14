const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const request = require("request")
const app = express();
app.set('view engine', 'ejs');



// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())
// Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/add', (req, rootRes) => {
  rootRes.render('add')
})
app.post("/add", (req, rootRes) => {
  let fetchData = req.body
  fetch('https://us17.api.mailchimp.com/3.0/lists', {
    method: "POST",
    body: JSON.stringify(fetchData),
    headers: {
      "Authorization": 'Basic 7c743847755da1b3e76bda155aef5765-us17',
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  }).then(res => {
    rootRes.send(res.status)
  })

})
app.get('/lists', function (req, rootRes) {
  fetch('https://us17.api.mailchimp.com/3.0/lists', {
    method: "GET",
    headers: {
      "Authorization": 'Basic 7c743847755da1b3e76bda155aef5765-us17',
      "Content-Type": "application/json"
    },
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log(res.lists)
    rootRes.render('lists', {
      items: res.lists
    })
  })
})


// app.post('/add', (req, res) => {
//   console.log("!!", req.body)
// fetch('https://us17.api.mailchimp.com/3.0/lists', {
//   method: "GET",
//   headers: {
//     "Authorization": 'Basic 7c743847755da1b3e76bda155aef5765-us17',
//     "Content-Type": "application/json"
//   },
// }).then(res => {
//   return res.json()
// }).then(res => {

// })
// })

// app.get('/users/lists', (req, response) => {
//   response.send(render('public/index.html', {
//     name: "test"
//   }));

// })





const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

