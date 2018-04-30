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
const TEMPLATE_MASTER_DATA_SHEET_ID = 0;
const TEMPLATE_WUL_MASTER_DATA_SHEET_ID = 141932026;
const TEMPLATE_NIGHT_SHEET_ID = 167009206;
const TEMPLATE_DAILY_SCHEDULE_SHEET_ID = 579430821;
const TEMPLATE_WUL_DAILY_SCHEDULE_SHEET_ID = 781228253;

// NEW SPREADSHEET ID REFS
const MASTER_DATA_SHEET_ID = 1200;
const NIGHTS_SHEET_ID = 1;



app.post('/api/create-group', (req, res) =>{
  groupRef.push(req.body.data).then((snap) =>{
    userRef.child(req.body.key).child('groups').push({key:snap.key, name:req.body.data.groupName})
    res.end(snap.key);
  });
});

app.get('/api/get-members/:group', (req, res) =>{
  // console.log(groupRef.child(req.body.group))
  groupRef.child(req.params.group).on('value', (snapshot) =>{
    res.send(snapshot.val().members);
    res.end();
  });
});

app.get('/api/get-groups/:key', (req, res) =>{
  console.log(req.params);
  userRef.child(req.params.key).on('value', (snapshot) =>{
    // res.send(snapshot.val().groups);
    // req.body.serverMessage = snapshot.val().groups;
    res.end(JSON.stringify(snapshot.val().groups))
  });
});

app.post('/api/edit-group', (req, res) => {
  groupRef.child(req.body.group).child('members').set(req.body.newMembers).then((snap) =>{
    //TODO: add stuff to update sheet
  });
  res.end()
})

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
  console.log(req.body)
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    let names = [];
    let numbers = [];
    for(let i = 0; i < req.body.info.data.members.length; i++){
      names.push(req.body.info.data.members[i].first + ' ' + req.body.info.data.members[i].last);
      numbers.push(req.body.info.data.members[i].phone);
    }
    var params = {
      'groupId': req.body.groupID,
      'groupType': req.body.info.data.type,

      'names': names,
      'numbers': numbers,

      'startOfBlackDateTime': new Date(req.body.info.data.tenting.blackStart),
      'startOfBlueDateTime': new Date(req.body.info.data.tenting.blueStart),
      'startOfWhiteDateTime': new Date(req.body.info.data.tenting.whiteStart),

      'startDateTime': new Date(req.body.info.data.start),
      'endDateTime': new Date(req.body.info.data.end),
    };
    authorize(JSON.parse(content), createSpreadsheet, params)
  });
  res.end("working");
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
        "title": 'K-Ville ' + params.groupType + ' Schedule'
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

      if (params.groupType == 'WUL') {
        authorize(JSON.parse(content), cloneWULMasterDataSheet, params);
      }
      if (params.groupType == 'Tent') {
        authorize(JSON.parse(content), cloneMasterDataSheet, params);
      }
    });
  });
}

function cloneMasterDataSheet(auth, params) {

  // COPY DAILY SCHEDULE TEMPLATE TO NEW DOC

  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: TEMPLATE_SPREADSHEET_ID,

    // The ID of the sheet to copy.
    sheetId: TEMPLATE_MASTER_DATA_SHEET_ID,

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

    params.masterDataTemplateSheetId = response.data.sheetId;

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

    fs.readFile('client_secret.json', (err, content) => {
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

    fs.readFile('client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), batchUpdatesForNewSpreadsheet, params);
    });
  });
}

function cloneWULMasterDataSheet(auth, params) {

  // COPY DAILY SCHEDULE TEMPLATE TO NEW DOC

  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: TEMPLATE_SPREADSHEET_ID,

    // The ID of the sheet to copy.
    sheetId: TEMPLATE_WUL_MASTER_DATA_SHEET_ID,

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

    params.masterDataTemplateSheetId = response.data.sheetId;

    fs.readFile('client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), cloneWULDailyScheduleSheet, params);
    });
  });
}

function cloneWULDailyScheduleSheet(auth, params) {

  // COPY DAILY SCHEDULE TEMPLATE TO NEW DOC

  var request = {
    // The ID of the spreadsheet containing the sheet to copy.
    spreadsheetId: TEMPLATE_SPREADSHEET_ID,

    // The ID of the sheet to copy.
    sheetId: TEMPLATE_WUL_DAILY_SCHEDULE_SHEET_ID,

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

    fs.readFile('client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), batchUpdatesForNewWULSpreadsheet, params);
    });
  });
}


function batchUpdatesForNewSpreadsheet(auth, params) {

  var names = params.names;
  var numbers = params.numbers;

  const NUM_TENTERS = 12;

  var startOfBlackDateTime = params.startOfBlackDateTime;
  var startOfBlueDateTime = params.startOfBlueDateTime;
  var startOfWhiteDateTime = params.startOfWhiteDateTime;

  var startDateTime = params.startDateTime;
  var endDateTime = params.endDateTime;

  var startOfBlackDate = new Date(startOfBlackDateTime.getFullYear(), startOfBlackDateTime.getMonth(), startOfBlackDateTime.getDate(),0,0,0);
  var startOfBlueDate = new Date(startOfBlueDateTime.getFullYear(), startOfBlueDateTime.getMonth(), startOfBlueDateTime.getDate(),0,0,0);
  var startOfWhiteDate = new Date(startOfWhiteDateTime.getFullYear(), startOfWhiteDateTime.getMonth(), startOfWhiteDateTime.getDate(),0,0,0);

  var startDate = new Date(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(),0,0,0);
  var endDate = new Date(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(),0,0,0);


  var batchRequest = []; // to build list of synchronous update requests
  var masterDataMatrixValues = []; // to build column of names and phone numbers for data sheet and formulas following it
  var nameValuesRow = []; // to build list of name values to be added to daily sheet


  // BUILD MASTER DATA SHEET, NIGHTS SHEET, AND DAILY TEMPLATE SHEET


  // duplicate masterd data sheet and delete cloned one (lets us set sheetId/index because other API call doesn't)
  batchRequest.push({
    "duplicateSheet": {
      "sourceSheetId": params.masterDataTemplateSheetId,
      "insertSheetIndex": 0,
      "newSheetId": MASTER_DATA_SHEET_ID,
      "newSheetName": "Master",
    }
  });
  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.masterDataTemplateSheetId,
    }
  });
  batchRequest.push({
    "deleteSheet": {
      "sheetId": 0, // delete the default first sheet
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


  for (var i = 0; i < NUM_TENTERS; i++) {
    nameValuesRow.push(
      {"userEnteredValue": {"formulaValue": '=\'Master\'!A' + (i+2)}}
    );
    var name = (i < names.length) ? names[i] : ('Tenter ' + (i+1));
    var number = (i < numbers.length) ? numbers[i] : '';
    masterDataMatrixValues.push({
      "values": [
        {"userEnteredValue": {"stringValue": name}},
        {"userEnteredValue": {"stringValue": number}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
      ]
    });
  }


  masterDataMatrixValues.push({
    "values": [
      {"userEnteredValue": {"stringValue": "Each Person Needs:"}},
      {"userEnteredValue": {"stringValue": "Total:"}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
    ]
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
    var currTentingSeason = '';
    if (d < startOfBlueDate) {
      currTentingSeason = 'BLACK';
      borderColor = { // black border for black tenting
        "red": 0.0,
        "green": 0.0,
        "blue": 0.0,
      };
    } else if (d < startOfWhiteDate) {
      currTentingSeason = 'BLUE';
      borderColor = { // blue border for blue tenting
        "red": 0.0,
        "green": 0.0,
        "blue": 1.0,
      };
    } else {
      currTentingSeason = 'WHITE';
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
          "sheetId": MASTER_DATA_SHEET_ID,
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
                "userEnteredValue": {"formulaValue": '=COUNTIF(F' + currNightRow + ':Q' + currNightRow + ',"G"' + ') > 0'},
              }
            ]
          }
        ],
        "fields": "userEnteredValue"
      }
    });


    var msInDay = 86400000;
    var isLastNightOfColorSeason = ((startOfBlueDate - d) == msInDay || (startOfWhiteDate - d) == msInDay || (endDate - d) == 0);
    if (isLastNightOfColorSeason) { // if last night of black, blue, or white tenting

      batchRequest.push({
        "updateCells": {
          "start": {
            "sheetId": NIGHTS_SHEET_ID,
            "rowIndex": currNightRow,
            "columnIndex": 0,
          },
          "rows": [
            {
              "values": [
                {
                  "userEnteredValue": {"stringValue": "shifts per person:"},
                },
                { // estimated number of nights for each tenter
                  "userEnteredValue": {"formulaValue": '=COUNTIF(E' + (rowIndexLastDayOfPreviousTentingPeriod + 1) + ':E' + currNightRow + ',FALSE)*' + numNeededAtNight + '/' + NUM_TENTERS},
                },
                {
                  "userEnteredValue": {"stringValue": currTentingSeason},
                },
                {
                  "userEnteredValue": {"stringValue": "TENTING"},
                },
                {
                  "userEnteredValue": {"stringValue": "TOTAL:"},
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


    // UPDATE FORMULAS ON MASTER DATA SHEET

    var rowIndex = NUM_TENTERS;
    var updateFormula;

    var colIndex;
    switch (currTentingSeason) {
      case 'BLACK': colIndex = 3; break;
      case 'BLUE': colIndex = 4; break;
      case 'WHITE': colIndex = 5; break;
    }

    updateFormula = masterDataMatrixValues[rowIndex].values[colIndex].userEnteredValue.formulaValue + '+(\'' + sheetName + '\'!' + 'B81)/' + NUM_TENTERS;
    masterDataMatrixValues[rowIndex].values[colIndex] = {"userEnteredValue": {"formulaValue": updateFormula}};

    updateFormula = '=D' + (rowIndex + 1) + '+E' + (rowIndex + 1) + '+F' + (rowIndex + 2);
    masterDataMatrixValues[rowIndex].values[6] = {"userEnteredValue": {"formulaValue": updateFormula}};

    if (isLastNightOfColorSeason) {
        // update total nights needed
        updateFormula = masterDataMatrixValues[rowIndex].values[2].userEnteredValue.formulaValue + '+(\'Nights\'!B' + currNightRow + ')';
        masterDataMatrixValues[rowIndex].values[2] = {"userEnteredValue": {"formulaValue": updateFormula}};
    }



    for ( let i = 0; i < NUM_TENTERS; i++ ){

      var colLetter = String.fromCharCode(97 + i + 4);

      rowIndex = i;
      updateFormula = masterDataMatrixValues[rowIndex].values[colIndex].userEnteredValue.formulaValue + '+(\'' + sheetName + '\'!' + colLetter + '81)';
      masterDataMatrixValues[rowIndex].values[colIndex] = {"userEnteredValue": {"formulaValue": updateFormula}};

      // if last night of tenting season, update Nights count on master data
      if (isLastNightOfColorSeason) {
        colLetter = String.fromCharCode(97 + i + 5); // Names are one column over on Nights sheet
        updateFormula = masterDataMatrixValues[rowIndex].values[2].userEnteredValue.formulaValue + '+(\'Nights\'!' + colLetter + currNightRow + ')';
        masterDataMatrixValues[rowIndex].values[2] = {"userEnteredValue": {"formulaValue": updateFormula}};
      }

      // set total count (yes this updates/overwrites every time deal with it I'm putting it here)
      updateFormula = '=D' + (rowIndex + 2) + '+E' + (rowIndex + 2) + '+F' + (rowIndex + 2);
      masterDataMatrixValues[rowIndex].values[6] = {"userEnteredValue": {"formulaValue": updateFormula}};

    }


  }

  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.dailyTemplateSheetId
    }
  });


  // set data in master data
  batchRequest.push({
    "updateCells": {
      "start": {
        "sheetId": MASTER_DATA_SHEET_ID,
        "rowIndex": 1,
        "columnIndex": 0,
      },
      "rows": masterDataMatrixValues,
      "fields": "userEnteredValue"
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

function batchUpdatesForNewWULSpreadsheet(auth, params) {

  var names = params.names;
  var numbers = params.numbers;
  var groupType = params.groupType;

  var startDateTime = params.startDateTime;
  var endDateTime = params.endDateTime;

  var startDate = new Date(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(),0,0,0);
  var endDate = new Date(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(),0,0,0);


  var batchRequest = []; // to build list of synchronous update requests
  var masterDataMatrixValues = []; // to build column of names and phone numbers for data sheet and formulas following it
  var nameValuesRow = []; // to build list of name values to be added to daily sheet


  // BUILD MASTER DATA SHEET, NIGHTS SHEET, AND DAILY TEMPLATE SHEET


  // duplicate masterd data sheet and delete cloned one (lets us set sheetId/index because other API call doesn't)
  batchRequest.push({
    "duplicateSheet": {
      "sourceSheetId": params.masterDataTemplateSheetId,
      "insertSheetIndex": 0,
      "newSheetId": MASTER_DATA_SHEET_ID,
      "newSheetName": "Master",
    }
  });
  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.masterDataTemplateSheetId,
    }
  });
  batchRequest.push({
    "deleteSheet": {
      "sheetId": 0, // delete the default first sheet
    }
  });



  masterDataMatrixValues.push({
    "values": [
      {"userEnteredValue": {"stringValue": "Person"}},
      {"userEnteredValue": {"stringValue": "Phone #"}},
      {"userEnteredValue": {"stringValue": "Total Hours"}},
    ]
  });

  for (var i = 0; i < 30; i ++) {
    nameValuesRow.push(
      {"userEnteredValue": {"formulaValue": '=\'Master\'!A' + (i+2)}}
    );
  }
  for (var i = 0; i < names.length; i++) {
    masterDataMatrixValues.push({
      "values": [
        {"userEnteredValue": {"stringValue": names[i]}},
        {"userEnteredValue": {"stringValue": numbers[i]}},
        {"userEnteredValue": {"formulaValue": '=(0)'}},
      ]
    });
  }

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


  for (
    var d = startDate, i = 2;
    d <= endDate;
    d.setDate(d.getDate() + 1), i++
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


    // UPDATE FORMULAS ON MASTER DATA SHEET

    var rowIndex;
    var colIndex = 2;

    for ( let i = 0; i < names.length; i++ ) {

      var colLetter = String.fromCharCode(97 + i + 4);

      rowIndex = i + 1;
      updateFormula = masterDataMatrixValues[rowIndex].values[colIndex].userEnteredValue.formulaValue + '+(\'' + sheetName + '\'!' + colLetter + '100)';
      masterDataMatrixValues[rowIndex].values[colIndex] = {"userEnteredValue": {"formulaValue": updateFormula}};
    }

  }

  batchRequest.push({
    "deleteSheet": {
      "sheetId": params.dailyTemplateSheetId
    }
  });


  // set data in master data
  batchRequest.push({
    "updateCells": {
      "start": {
        "sheetId": MASTER_DATA_SHEET_ID,
        "rowIndex": 0,
        "columnIndex": 0,
      },
      "rows": masterDataMatrixValues,
      "fields": "userEnteredValue"
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
