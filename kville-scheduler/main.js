var express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
var database = require('./server/database.js')
var config = require('./server/config.js')


var groupRef = database.groups

const app = express()
app.use(bodyParser.json());
console.log(__dirname + '/dist')
app.use(express.static(__dirname + '/dist'));

app.post('/api/test', (req, res) =>{
  groupRef.push({
    "name" : req.body.name
  })
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

console.log(config)
app.listen(config.PORT, () => {
  console.log("listening on port " + config.PORT)
  console.log(process.env.PORT)
})
