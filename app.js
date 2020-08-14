const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
var fs = require('fs');
app.set('view engine', 'ejs');
app.get('/users/:name', function (req, res) {
  res.render('index', { // 這邊不用寫 views/index 是因為 express 預設 template 就是會放在 views 資料夾裡面
    name: req.params.name,
    items: ['peter', 'luke', 'cake']
  })
})

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


function render(filename, params) {
  var data = fs.readFileSync(filename, 'utf8');
  for (var key in params) {
    data = data.replace('{' + key + '}', params[key]);
  }
  return data;
}

app.get('/users/lists', (req,response) => {
  response.send(render('public/index.html', {
    name: "test"
  }));
  fetch('https://us17.api.mailchimp.com/3.0/lists',{
    method:"GET",
       headers: {
      "Authorization": 'Basic 7c743847755da1b3e76bda155aef5765-us17',
      "Content-Type":"application/json"
    },
  }).then(res=>{
   
    return res.json()
  }).then(res=>{
    response.render('index', { // 這邊不用寫 views/index 是因為 express 預設 template 就是會放在 views 資料夾裡面
      name: req.params.name,
      items: ['peter', 'luke', 'cake']
    })


    console.log(res.lists)
  })
})

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(req.body)
  // Make sure fields are filled
  // if (!firstName || !lastName || !email) {
  //   res.redirect('/fail.html');
  //   return;
  // }

  // Construct req data
  // const data = {
  //   members: [
  //     {
  //       email_address: email,
  //       status: 'subscribed',
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     }
  //   ]
  // };

 
  // const postData = JSON.stringify(data);

  // fetch('https://usX.api.mailchimp.com/3.0/lists/<YOUR_AUDIENCE_ID>', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: 'auth <YOUR_API_KEY>'
  //   },
  //   body: postData
  // })
  //   .then(res.statusCode === 200 ?
  //     res.redirect('/success.html') :
  //     res.redirect('/fail.html'))
  //   .catch(err => console.log(err))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
