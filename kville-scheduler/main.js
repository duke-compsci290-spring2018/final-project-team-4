var express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
var database = require('./server/database.js')
var config = require('./server/config.js')
var path = require('path')


var groupRef = database.groups

const app = express()
app.use(bodyParser.json());
// console.log(__dirname + '/dist')
app.use(express.static(__dirname + '/dist'));


const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'credentials.json';

var activeSpreadsheetID;

// Load client secrets from a local file.
// fs.readFile('client_secret.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });


app.post('/api/create-group', (req, res) =>{
  groupRef.push({
    "name": req.body.name,
    "users": req.body.users,
    "schedule": req.body.schedule
  });
  res.end();
});

app.post('api/add-user', (req, res) => {
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(config.PORT, () => {
  console.log("listening on port " + config.PORT)
});

app.post('/api/save-user', (req, res) =>{
  var auth = {
    access_token: req.body.auth.access_token,
    token_type: req.body.auth.token_type,
    expiry_date: req.body.auth.expires_at
  };
  fs.writeFile(TOKEN_PATH, JSON.stringify(auth), (err)=>{
    if(err) console.log(err);
    console.log('Token stored to', TOKEN_PATH)
  });
  res.end("User has been saved");
});

app.post('/api/clone-sheet', (req, res) => {
  // TODO need auth somehow!!
  fs.readFile('client_secret.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), createSpreadsheet)
  });
  res.send("working");
});


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {OAuth2Client} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  // console.log(auth);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      })
    } else {
      console.log('No data found.');
    }
  });
}

function createSpreadsheet(auth) {
  console.log('creating spreadsheet');
  var request = {
    resource: {
      "properties": {
        "title": "New Title Who Dis"
      }
    },

    auth: auth,
  };

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.create(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(response);
    this.activeSpreadsheetID = response.data.spreadsheetId;
    fs.readFile('client_secret.json', async (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), copyTemplateToSpreadsheet);
    });
  });
}

function copyTemplateToSpreadsheet(auth) {
  console.log('copying template');
  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: '1eHFGt_nyilZHwr1_0dnY4rdqb1G5qYunCYUl1d6UAc4',  // TODO: Update placeholder value.

    // The ID of the sheet to copy.
    sheetId: 579430821,  // TODO: Update placeholder value.

    resource: {
      // The ID of the spreadsheet to copy the sheet to.
      destinationSpreadsheetId: this.activeSpreadsheetID,  // TODO: Update placeholder value.

      // TODO: Add desired properties to the request body.
    },

    auth: auth,
  };

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.sheets.copyTo(request, function(err, response) {
    if (err) {
      // console.error(err);
      return;
    }
    console.log('trying to copy');
    // TODO: Change code below to process the `response` object:
    // console.log(response);
  });
}
