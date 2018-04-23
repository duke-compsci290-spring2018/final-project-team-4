var Express = require('express')
var config = require('./config.js')
var database = require('./database.js')


var groupRef = database.groups

const app = Express()
app.use(express.static(__dirname + '/public'));

// app.get('/api/test', (req, res) =>{
//   groupRef.push({
//     "name" :
//   })
// })

app.get('/', (req, res) =>{
  groupRef.push({
    "name": "Test"
  })
  res.json({"message": "Welcome to our kville scheduler app"})
  res.end()
})

console.log(config)
app.listen(config.PORT, config.HOST, () => {
  console.log("listening on port " + config.PORT)
})
