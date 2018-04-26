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

function createSpreadsheet(auth) {
  console.log('Creating new schedule spreadsheet');

  // CREATE NEW SCHEDULE SPREADSHEET

  var request = {
    resource: {
      "properties": {
        "title": "K-ville Schedule"
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

    var activeSpreadsheetID = response.data.spreadsheetId;
    // TODO store this new spreadsheetId to firebase so we have access to it

    fs.readFile('client_secret.json', async (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), function(auth) {

        // TODO COPY STATS TEMPLATE PAGE PAGE TO NEW DOC


        // TODO COPY NIGHTS TEMPLATE PAGE TO NEW DOC


        // COPY DAILY SCHEDULE TEMPLATE TO NEW DOC

        var request = {
          // The ID of the spreadsheet containing the sheet to copy.
          spreadsheetId: '1eHFGt_nyilZHwr1_0dnY4rdqb1G5qYunCYUl1d6UAc4',

          // The ID of the sheet to copy.
          sheetId: 579430821,

          resource: {
            // The ID of the spreadsheet to copy the sheet to.
            destinationSpreadsheetId: activeSpreadsheetID,
          },

          auth: auth,
        };

        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.sheets.copyTo(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }

          var templateSheetId = response.data.sheetId;

          fs.readFile('client_secret.json', async (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            authorize(JSON.parse(content), function(auth) {

              // DUPLICATE NEW DAILY TEMPLATE FOR EACH DAY OF TENTING

              // TODO get names from firebase
              // TODO use start date and end date to build days list
              var names = ['Addison', 'Blake', 'Thomas', 'Emily', 'Charlotte', 'Grant'];
              var days = ['1/15 Mo', '1/16 Tu', '1/17 We', '1/18 Th', '1/19 Fr', '1/20 Sa', '1/21 Su'];

              var batchRequest = []; // to build list of synchronous update requests


              var nameValues = []; // to build list of name values to be added to spreadsheet
              for (var i = 0; i < names.length; i++) {
                nameValues.push({
                  "userEnteredValue": {"stringValue": names[i]}
                });
              }

              batchRequest.push({
                "updateCells": {
                  "start": {
                    "sheetId": templateSheetId,
                    "rowIndex": 0,
                    "columnIndex": 4, // index to begin putting names for daily schedule
                  },
                  "rows": [
                    {
                      "values": nameValues,
                    }
                  ],
                  "fields": "userEnteredValue" 
                }
              });

              // build request objects for each day
              for (var i = 0; i < days.length; i++) {
                batchRequest.push({
                    "duplicateSheet": {
                      "sourceSheetId": templateSheetId,
                      "insertSheetIndex": i + 2,
                      "newSheetId": i + 1, // TODO make the sheetId correspond to a date such as 20180115
                      "newSheetName": days[i],
                    }
                  });
              }

              batchRequest.push({
                "deleteSheet": {
                  "sheetId": templateSheetId
                }
              })

              var request = {
                spreadsheetId: activeSpreadsheetID,

                resource: {
                  requests: batchRequest,
                },

                auth: auth,
              };

              const sheets = google.sheets({version: 'v4', auth});
              sheets.spreadsheets.batchUpdate(request, function(err, response) {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            });
          });
        });
      });
    });
  });
}