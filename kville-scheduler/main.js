var express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
var database = require('./server/database.js')
var config = require('./server/config.js')
var path = require('path')


var groupRef = database.groups

const app = express()
app.use(bodyParser.json());
console.log(__dirname + '/dist')
app.use(express.static(__dirname + '/dist'));


app.post('/api/create-group', (req, res) =>{
  groupRef.push({
    "name": req.body.name,
    "users": req.body.users,
    "schedule": req.body.schedule
  });
  res.end();
});

app.post('api/add-user', (req, res) => {
  console.log('adding user')
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(config.PORT, () => {
  console.log("listening on port " + config.PORT)
});
