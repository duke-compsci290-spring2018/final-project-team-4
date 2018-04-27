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


// TEMPLATE ID REFS
const TEMPLATE_SPREADSHEET_ID = '1eHFGt_nyilZHwr1_0dnY4rdqb1G5qYunCYUl1d6UAc4';
const TEMPLATE_DATA_SHEET_ID = 0;
const TEMPLATE_NIGHT_SHEET_ID = 167009206;
const TEMPLATE_DAILY_SCHEDULE_SHEET_ID = 579430821;


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
          spreadsheetId: TEMPLATE_SPREADSHEET_ID,

          // The ID of the sheet to copy.
          sheetId: TEMPLATE_DAILY_SCHEDULE_SHEET_ID,

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
              var names = ['Addison', 'Blake', 'Thomas', 'Emily', 'Charlotte', 'Grant', 'Joel', 'Katie', 'Ken', 'Noah', 'Eric', 'Reed'];
              var numbers = ['504-920-4520', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

              var startDate = new Date(2018, 00, 15, 12, 00, 00);
              var endDate = new Date(2018, 01, 25, 12, 00, 00);
              var startOfBlackDate = new Date(2018, 00, 15, 12, 00, 00);
              var startOfBlueDate = new Date(2018, 00, 25, 12, 00, 00);
              var startOfWhiteDate = new Date(2018, 01, 15, 12, 00, 00);


              var batchRequest = []; // to build list of synchronous update requests
              var nameValuesCol = []; // to build column of names and phone numbers for data sheet
              var nameValuesRow = []; // to build list of name values to be added to daily sheet


              nameValuesCol.push({
                "values": [
                  {"userEnteredValue": {"stringValue": "Person"}},
                  {"userEnteredValue": {"stringValue": "Phone #"}},
                  {"userEnteredValue": {"stringValue": "Nights"}},
                  {"userEnteredValue": {"stringValue": "Day Hrs - Black"}},
                  {"userEnteredValue": {"stringValue": "Day Hrs - Blue"}},
                  {"userEnteredValue": {"stringValue": "Day Hrs - White"}},
                  {"userEnteredValue": {"stringValue": "Day Hrs - Total"}},
                ]
              });

              for (var i = 0; i < names.length; i++) {
                nameValuesRow.push(
                  {"userEnteredValue": {"stringValue": names[i]}}
                );
                nameValuesCol.push({
                  "values": [
                    {"userEnteredValue": {"stringValue": names[i]}},
                    {"userEnteredValue": {"stringValue": numbers[i]}}
                  ]
                });
              }

              // set names and numbers on data sheet
              batchRequest.push({
                "updateCells": {
                  "start": {
                    "sheetId": 0,
                    "rowIndex": 0,
                    "columnIndex": 0,
                  },
                  "rows": nameValuesCol,
                  "fields": "userEnteredValue" 
                }
              });

              // set names on daily template sheet
              batchRequest.push({
                "updateCells": {
                  "start": {
                    "sheetId": templateSheetId,
                    "rowIndex": 0,
                    "columnIndex": 4, // index to begin putting names for daily schedule
                  },
                  "rows": [
                    {
                      "values": nameValuesRow,
                    }
                  ],
                  "fields": "userEnteredValue" 
                }
              });

              var currCalendarRow = 16;

              for (var d = startDate, i = 2; d < endDate; d.setDate(d.getDate() + 1), i++) {

                var month = d.getMonth() + 1; // months are 0 indexed bc JS is stupid
                var sheetName = "" + month + "/" + d.getDate();
                switch ( d.getDay() ) {
                  case 0: sheetName += " Su"; break;
                  case 1: sheetName += " Mo"; break;
                  case 2: sheetName += " Tu"; break;
                  case 3: sheetName += " We"; break;
                  case 4: sheetName += " Th"; break;
                  case 5: sheetName += " Fr"; break;
                  case 6: sheetName += " Sa"; break;
                }
                var newSheetId = "" + d.getFullYear() + d.getMonth() + d.getDate();

                batchRequest.push({
                    "duplicateSheet": {
                      "sourceSheetId": templateSheetId,
                      "insertSheetIndex": i,
                      "newSheetId": newSheetId,
                      "newSheetName": sheetName,
                    }
                  });



                // Add day to Data Sheet Calendar
                var borderColor;
                if (d < startOfBlueDate) {
                  borderColor = { // black border for black tenting
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                  };
                } else if (d < startOfWhiteDate) {
                  borderColor = { // blue border for blue tenting
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 1.0,
                  };
                } else {
                  borderColor = { // white border for white tenting
                    "red": 1.0,
                    "green": 1.0,
                    "blue": 1.0,
                  };
                }
                var calendarDayBorder = {
                  "style": "SOLID_THICK",
                  "color": borderColor
                };

                batchRequest.push({
                  "updateCells": {
                    "start": {
                      "sheetId": 0,
                      "rowIndex": currCalendarRow,
                      "columnIndex": d.getDay(),
                    },
                    "rows": [
                      {
                        "values": [
                          {
                            "userEnteredValue": {"formulaValue": '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + activeSpreadsheetID + '/edit#gid=' + newSheetId + '","' + sheetName + '")'},
                            "userEnteredFormat": {
                              "borders": {
                                "top": calendarDayBorder,
                                "bottom": calendarDayBorder,
                                "left": calendarDayBorder,
                                "right": calendarDayBorder,
                              },
                            },
                            "hyperlink": "www.google.com",
                          },
                        ]
                      }
                    ],
                    "fields": "*" 
                  }
                });



                if (d.getDay() == 6) {
                  currCalendarRow++; // new week on generated calendar
                } 
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