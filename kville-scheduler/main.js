var express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
var database = require('./server/database.js')
var config = require('./server/config.js')
var path = require('path')


var groupRef = database.groups
var userRef = database.users;

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
const TEMPLATE_NIGHT_SHEET_ID = 167009206;
const TEMPLATE_DAILY_SCHEDULE_SHEET_ID = 579430821;

// NEW SPREADSHEET ID REFS
const MASTER_DATA_SHEET_ID = 0;
const NIGHTS_SHEET_ID = 1;



app.post('/api/create-group', (req, res) =>{
  groupRef.push(req.body.data).then((snap) =>{
    userRef.child(req.body.key).child('groups').push(snap.key)
  });
  res.end();
});

// app.get('/api/get-members/:group', (req, res) =>{
//   // console.log(groupRef.child(req.body.group))
//   console.log('working')
//   res.end();
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(config.PORT, () => {
  console.log("listening on port " + config.PORT)
});

app.post('/api/save-user', (req, res) =>{
  // console.log(userRef.child(req.body.profile.Eea).exists())
  userRef.once('value', (snapshot)=>{
    if(!snapshot.hasChild(req.body.profile.Eea)){
      console.log('user doesn\'t exist');
      userRef.child(req.body.profile.Eea).set({
        "name": req.body.profile.ig,
        "email": req.body.profile.U3,
        "groups": []
      });
    }
  });

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
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    var params = {};
    authorize(JSON.parse(content), createSpreadsheet, params)
  });
  res.send("working");
});


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, params) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client, params);
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

function createSpreadsheet(auth, params) {
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

    params.activeSpreadsheetID = response.data.spreadsheetId; // TODO store this new spreadsheetId to firebase so we have access to it

    fs.readFile('client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), cloneDailyScheduleSheet, params);
    });
  });
}

function cloneDailyScheduleSheet(auth, params) {

  // COPY DAILY SCHEDULE TEMPLATE TO NEW DOC

  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: TEMPLATE_SPREADSHEET_ID,

    // The ID of the sheet to copy.
    sheetId: TEMPLATE_DAILY_SCHEDULE_SHEET_ID,

    resource: {
      // The ID of the spreadsheet to copy the sheet to.
      destinationSpreadsheetId: params.activeSpreadsheetID,
    },

    auth: auth,
  };

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.sheets.copyTo(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    params.dailyTemplateSheetId = response.data.sheetId;

    fs.readFile('client_secret.json', async (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), cloneNightsScheduleSheet, params);
    });
  });
}

function cloneNightsScheduleSheet(auth, params) {

  // COPY NIGHTS TEMPLATE TO NEW DOC

  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: TEMPLATE_SPREADSHEET_ID,

    // The ID of the sheet to copy.
    sheetId: TEMPLATE_NIGHT_SHEET_ID,

    resource: {
      // The ID of the spreadsheet to copy the sheet to.
      destinationSpreadsheetId: params.activeSpreadsheetID,
    },

    auth: auth,
  };

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.sheets.copyTo(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    params.nightsSheetId = response.data.sheetId;

    fs.readFile('client_secret.json', async (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), batchUpdatesForNewSpreadsheet, params);
    });
  });
}


function batchUpdatesForNewSpreadsheet(auth, params) {

  // TODO get names, dates, etc from params
  var names = ['Addison', 'Blake', 'Thomas', 'Emily', 'Charlotte', 'Grant', 'Joel', 'Katie', 'Ken', 'Noah', 'Eric', 'Reed'];
  var numbers = ['504-920-4520', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

  var startOfBlackDateTime = new Date(2018, 00, 12, 23, 00, 00);
  var startOfBlueDateTime = new Date(2018, 00, 26, 23, 00, 00);
  var startOfWhiteDateTime = new Date(2018, 01, 09, 23, 00, 00);

  var startDateTime = new Date(2018, 00, 15, 23, 00, 00);
  var endDateTime = new Date(2018, 01, 22, 12, 00, 00);

  var startOfBlackDate = new Date(startOfBlackDateTime.getFullYear(), startOfBlackDateTime.getMonth(), startOfBlackDateTime.getDate(),0,0,0);
  var startOfBlueDate = new Date(startOfBlueDateTime.getFullYear(), startOfBlueDateTime.getMonth(), startOfBlueDateTime.getDate(),0,0,0);
  var startOfWhiteDate = new Date(startOfWhiteDateTime.getFullYear(), startOfWhiteDateTime.getMonth(), startOfWhiteDateTime.getDate(),0,0,0);

  var startDate = new Date(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(),0,0,0);
  var endDate = new Date(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(),0,0,0);


  var batchRequest = []; // to build list of synchronous update requests
  var nameValuesCol = []; // to build column of names and phone numbers for data sheet
  var nameValuesRow = []; // to build list of name values to be added to daily sheet


  // BUILD MASTER DATA SHEET, NIGHTS SHEET, AND DAILY TEMPLATE SHEET

  batchRequest.push({
    "updateSheetProperties": {
      "properties": {
        "sheetId": MASTER_DATA_SHEET_ID,
        "title": "Master",
      },
      "fields": "title"
    }
  });

  // duplicate nights sheet and delete cloned one (lets us set sheetId/index because other API call doesn't)
  batchRequest.push({
    "duplicateSheet": {
      "sourceSheetId": params.nightsSheetId,
      "insertSheetIndex": 1,
      "newSheetId": 1, 
      "newSheetName": "Nights",
    }
  });
  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.nightsSheetId,

    }
  });

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
        "sheetId": params.dailyTemplateSheetId,
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

  // set names on nights sheet
  batchRequest.push({
    "updateCells": {
      "start": {
        "sheetId": NIGHTS_SHEET_ID,
        "rowIndex": 0,
        "columnIndex": 5, 
      },
      "rows": [
        {
          "values": nameValuesRow,
        }
      ],
      "fields": "userEnteredValue" 
    }
  });


  for (
    var d = startDate, i = 2, currCalendarRow = 16, currNightRow = 2, rowIndexLastDayOfPreviousTentingPeriod = 1;
    d <= endDate;
    d.setDate(d.getDate() + 1), i++, currNightRow++
    ) 
  {

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

    // duplicate daily schedule for each day
    batchRequest.push({
      "duplicateSheet": {
        "sourceSheetId": params.dailyTemplateSheetId,
        "insertSheetIndex": i,
        "newSheetId": newSheetId,
        "newSheetName": sheetName,
      }
    });

    // SET UP MASTER DATA SHEET

    if ( d.getDate() == 1 ) { // if new month
      currCalendarRow += 2;
    }

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
                "userEnteredValue": {"formulaValue": '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + params.activeSpreadsheetID + '/edit#gid=' + newSheetId + '","' + sheetName + '")'},
                "userEnteredFormat": {
                  "borders": {
                    "top": calendarDayBorder,
                    "bottom": calendarDayBorder,
                    "left": calendarDayBorder,
                    "right": calendarDayBorder,
                  },
                },
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


    // SET UP NIGHTS SHEET

    var numNeededAtNight = 10;
    if ( d >= startOfBlueDate ) {
      numNeededAtNight = 6;
    }
    if ( d >= startOfWhiteDate ) {
      numNeededAtNight = 2;
    }

    batchRequest.push({
      "updateCells": {
        "start": {
          "sheetId": NIGHTS_SHEET_ID,
          "rowIndex": currNightRow - 1,
          "columnIndex": 0,
        },
        "rows": [
          {
            "values": [
              {
                "userEnteredValue": {"formulaValue": '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + params.activeSpreadsheetID + '/edit#gid=' + newSheetId + '","' + sheetName + '")'},
              },
              {
                "userEnteredValue": {"stringValue": "2:30 A 7:00 A"},
              },
              {
                "userEnteredValue": {"formulaValue": '=OR(D' + currNightRow + '>=' + numNeededAtNight + ',E' + currNightRow + ')'},
              },
              {
                "userEnteredValue": {"formulaValue": '=COUNTIF(F' + currNightRow + ':Q' + currNightRow + ',"T"' + ')'},
              },
              {
                "userEnteredValue": {"formulaValue": '=COUNTIF(F' + currNightRow + ':Q' + currNightRow + ',"G"' + '> 0)'},
              }
            ]
          }
        ],
        "fields": "userEnteredValue" 
      }
    });


    var msInDay = 86400000;
    if ((startOfBlueDate - d) == msInDay || (startOfWhiteDate - d) == msInDay || (endDate - d) == 0) { // if last night of black, blue, or white tenting
      
      var colorPeriodString = "Black";
      if ((startOfWhiteDate - d) == msInDay) {
        colorPeriodString = "Blue";
      }
      if ((endDate - d) == 0) {
        colorPeriodString = "White";
      }

      batchRequest.push({
        "updateCells": {
          "start": {
            "sheetId": NIGHTS_SHEET_ID,
            "rowIndex": currNightRow,
            "columnIndex": 2,
          },
          "rows": [
            {
              "values": [
                {
                  "userEnteredValue": {"stringValue": colorPeriodString},
                },
                {
                  "userEnteredValue": {"stringValue": "Tenting"},
                },
                {
                  "userEnteredValue": {"stringValue": "Total:"},
                },
              ]
            }
          ],
          "fields": "userEnteredValue"
        }
      });
      
      batchRequest.push({
        "repeatCell": {
          "range": {
            "sheetId": NIGHTS_SHEET_ID,
            "startRowIndex": currNightRow,
            "endRowIndex": currNightRow + 1,
            "startColumnIndex": 5,
            "endColumnIndex": 17,
          },
          "cell": {
            "userEnteredValue": {"formulaValue": '=COUNTIF(F' + (rowIndexLastDayOfPreviousTentingPeriod + 1) +':F' + currNightRow + ', "T")'},
          },
          "fields": "userEnteredValue",
        }
      });
      
      currNightRow++;
      rowIndexLastDayOfPreviousTentingPeriod = currNightRow;
    }




    // FIX FOR BLACK TENTING

    // if during black tenting, you need 2 during the day instead of 1 (template has 1 by default)
    if ( d < startOfBlueDate ) {
      batchRequest.push({
        "repeatCell": {
          "range": {
            "sheetId": newSheetId,
            "startRowIndex": 1,
            "endRowIndex": 78, // end of day hours, start of nighthours
            "startColumnIndex": 1,
            "endColumnIndex": 2,
          },
          "cell": {
            "userEnteredValue": {"formulaValue": "=OR(C2>=2,D2)"}, // we update that we need 2 tenters present here
          },
          "fields": "userEnteredValue",
        }
      });
    }


  }

  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.dailyTemplateSheetId
    }
  });

  var request = {
    spreadsheetId: params.activeSpreadsheetID,

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
}