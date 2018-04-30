=== KvilleScheduler ===

Created by Blake Becerra and Addison Howenstine
Hours spent: 120

### Overview

This site allows users to create a group of "tenters" to form a K-Ville basketball tent group and output a highly reactive and usable schedule in the form of a Google Docs spreadsheet that can be used by a group to sign up for tent shifts and detect when gaps in the schedule need to be filled. The most successful tent groups and Walk Up Line groups in K-Ville are the groups that create good Google Doc schedules, we hope that our application can make it easier for experienced and unexperienced groups to create better schedules quicker.

We used the new Google Sheets API to create a spreadsheet and bundle a batch of updates to send to the sheet to build a multi-sheet schedule. This creates a schedule and saves it to the user's Google Docs page. All logins are handled with Google's login API, therefore we have access to save a Sheet to their Docs without needing to store their passwords. On a user's first login, a new user is created in Firebase and any groups the user creates are associated with their account.

Initially we began to create separate logins for different types of users and guests, but this constraint didn't make any sense for the scope of our project because all users accessing our website are coming for one purpose: to output schedules to their personal Google Docs. There isn't much realistic functionality available for someone who is not willing to login with Google because we can't save a spreadsheet for them if they don't.

The Google Sheets API is very new and rudimentary at best. We encountered a lot of road blocks with this as well as some bugs in their own code; there aren't many developers using these APIs yet so documentation for bugs was sparse. However, after getting the hang of their API, we found it to be very powerful and useful once set up. For example, we included a method that allows a user to change information about their tent group after creating a spreadsheet: this method updates user information both in Firebase as well as in the Google Sheet by calling Google's API to update specific cells in the sheet as indicated by a spreadsheetId stored for each user's groups in Firebase. Our design for this part is super extensible to adding new features to make changes to the schedule from our website as users request it.


### Known Bugs

Refreshing the pick-group page interferes with the Google Login gapi authentication protocol because there isn't a sufficient amount of time to make the API request before the page is loaded so the gapi authentication is lost. To fix this, the user must go back to the welcome page and refresh. We tried many options for troubleshooting this but were limited by the API call's speed.

When creating a new Tent group, sometimes initially when the user begins to input data and then selects the Tent or Walk Up Line radio box, the page deletes the data stored on the page and removes functionality from the buttons below. We have traced this bug back to an error in Angular's change detection time which does not recognize changes and respond to them quick enough for user input. To fix this, the user can go back to the previous page and then forward to the make-group page to try again and it almost always works the second time.


### Moving Forward

Experimenting with Angular and learning how to integrate Angular/NodeJS/Heroku/Firebase/GoogleAuth/GithubPages/etc for this project was the root of a lot of road blocks for us that ate up a lot of our time, but we're really happy with the functionality of the final product and the quality of the spreadsheet schedule it produces.

We worked hard to keep our code well commented, particularly with the confusing Google Sheets API calls in main.js, so that we can come back to add changes later. Though the styling may not be pretty.. like at all.. the functionality is there and we want people to be able to use our site by next tenting season.

We're both graduating soon, but we plan to continue to work on the site and make significant improvements as we get more feedback from friends who have tented and will be tenting next year. We've heard a lot of interest expressed from tenters and Line Monitors who'd like to see this website work. The current state of the site is absolutely sufficient for creating excellent spreadsheets that already surpass the functionality of most tent groups' schedules, but we know it can be even better and hope to improve both the usability of the schedule and the site we've built to create it.
