webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".container {\n\ttext-align: center;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n\t<h1>K-ville Scheduler</h1>\n\t<app-welcome-page *ngIf=\"!signedIn()\"></app-welcome-page>\n\t<h2><a (click)=\"test()\">Test API</a></h2>\n\t<a routerLink=\"make-group\" routerLinkActive=\"active\">Make a Group</a>\n\t<!-- <app-make-group></app-make-group> -->\n\t<router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = 'app';
    }
    AppComponent.prototype.test = function () {
        var auth = gapi.auth2.getAuthInstance().currentUser.get();
        var props = { auth: auth };
        this.http.post('/api/clone-sheet', props)
            .subscribe(function (posts) {
            console.log(posts);
        });
    };
    AppComponent.prototype.logginName = function () {
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            return '';
        }
        return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    };
    AppComponent.prototype.signedIn = function () {
        // return gapi.auth2.getAuthInstance().isSignedIn.get();
        return true;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__navbar_navbar_component__ = __webpack_require__("./src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__welcome_page_welcome_page_component__ = __webpack_require__("./src/app/welcome-page/welcome-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__("./node_modules/angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular_google_signin__ = __webpack_require__("./node_modules/angular-google-signin/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular_google_signin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angular_google_signin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__groups_page_groups_page_component__ = __webpack_require__("./src/app/groups-page/groups-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__make_schedule_make_schedule_component__ = __webpack_require__("./src/app/make-schedule/make-schedule.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__make_group_make_group_component__ = __webpack_require__("./src/app/make-group/make-group.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    { path: 'make-group', component: __WEBPACK_IMPORTED_MODULE_15__make_group_make_group_component__["a" /* MakeGroupComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__welcome_page_welcome_page_component__["a" /* WelcomePageComponent */],
                __WEBPACK_IMPORTED_MODULE_13__groups_page_groups_page_component__["a" /* GroupsPageComponent */],
                __WEBPACK_IMPORTED_MODULE_11_angular_google_signin__["GoogleSignInComponent"],
                __WEBPACK_IMPORTED_MODULE_14__make_schedule_make_schedule_component__["a" /* MakeScheduleComponent */],
                __WEBPACK_IMPORTED_MODULE_15__make_group_make_group_component__["a" /* MakeGroupComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routes)
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/groups-page/groups-page.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/groups-page/groups-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/groups-page/groups-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GroupsPageComponent = /** @class */ (function () {
    function GroupsPageComponent() {
    }
    GroupsPageComponent.prototype.ngOnInit = function () {
    };
    GroupsPageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-groups-page',
            template: __webpack_require__("./src/app/groups-page/groups-page.component.html"),
            styles: [__webpack_require__("./src/app/groups-page/groups-page.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupsPageComponent);
    return GroupsPageComponent;
}());



/***/ }),

/***/ "./src/app/make-group/make-group.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/make-group/make-group.component.html":
/***/ (function(module, exports) {

module.exports = "<form #userForm=\"ngForm\" (ngSubmit)=\"submit()\">\n  <fieldset>\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-6\">\n        <label for=\"groupName\" >Group Name:</label>\n        <input type=\"text\" id=\"groupName\" class=\"form-control\" name=\"group\" [(ngModel)]=\"data.groupName\" placeholder=\"Enter group name here\" required />\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"type\">Group Type:{{data.type}}</label><br/>\n        <div class=\"form-check form-check-inline\">\n          <input id=\"tent\" class=\"form-check-input\" type=\"radio\" name=\"type\" value=\"Tent\" [(ngModel)]=\"data.type\" required />\n          <label class=\"form-check-label\" for=\"tent\">Tent</label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <input id=\"tent\" class=\"form-check-input\" type=\"radio\" name=\"type\" value=\"WUL\" [(ngModel)]=\"data.type\" required />\n          <label class=\"form-check-label\" for=\"tent\">Walk-Up Line</label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <input id=\"tent\" class=\"form-check-input\" type=\"radio\" name=\"type\" value=\"CWUL\" [(ngModel)]=\"data.type\" required />\n          <label class=\"form-check-label\" for=\"tent\">Carolina Walk-Up Line</label>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-6\">\n        <label for=\"startDate\">Group Start Date:{{data.start}}</label>\n        <input type=\"date\" id=\"startDate\" class=\"form-control\" name=\"start\" [(ngModel)]=\"data.start\" required />\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"endDate\">Group End Date:{{data.end}}</label>\n        <input type=\"date\" id=\"endDate\" class=\"form-control\" name=\"end\" [(ngModel)]=\"data.end\" required />\n      </div>\n    </div>\n  </fieldset>\n  <fieldset>\n    <div *ngFor=\"let u of data.users; let i=index\">\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-4\">\n          <label for=\"first\">{{ i + 1 }} Member's First Name:</label>\n          <input type=\"text\" id=\"first\" class=\"form-control\" name=\"{{i}}first\" [(ngModel)]=\"u.first\" placeholder=\"Insert member's first name\" required />\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"last\">{{ i + 1 }} Member's Last Name:</label>\n          <input type=\"text\" id=\"last\" class=\"form-control\" name=\"{{i}}last\" [(ngModel)]=\"u.last\" placeholder=\"Insert member's last name\" required />\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"phone\">{{ i + 1 }} Member's Phone Number:</label>\n          <input type=\"text\" class=\"form-control\" id=\"phone\" name=\"{{i}}phone\" placeholder=\"123-456-7890\" pattern=\"[0-9]{3}-[0-9]{3}-[0-9]{4}\" maxlength=\"12\" [(ngModel)]=\"u.phone\" required />\n        </div>\n      </div>\n    </div>\n  </fieldset>\n  <div>\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"addMember()\">Add Member</button>\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"removeMember()\">Remove Last Member</button>\n    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!userForm.valid\">Submit Group Members</button>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/make-group/make-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MakeGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MakeGroupComponent = /** @class */ (function () {
    function MakeGroupComponent() {
        this.data = {
            groupName: "",
            start: "",
            end: "",
            type: "",
            users: [{
                    first: '',
                    last: '',
                    phone: ''
                }]
        };
    }
    MakeGroupComponent.prototype.ngOnInit = function () {
    };
    MakeGroupComponent.prototype.addMember = function () {
        this.data.users.push({
            first: '',
            last: '',
            phone: ''
        });
    };
    MakeGroupComponent.prototype.removeMember = function () {
        this.data.users.pop();
        if (this.data.users.length === 0) {
            this.addMember();
        }
    };
    MakeGroupComponent.prototype.submit = function () {
        if (this.data.start > this.data.end) {
            console.log('invalid');
            alert("Start date must be before the end date. Please validate your input");
            return;
        }
        console.log(this.data);
    };
    MakeGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-make-group',
            template: __webpack_require__("./src/app/make-group/make-group.component.html"),
            styles: [__webpack_require__("./src/app/make-group/make-group.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MakeGroupComponent);
    return MakeGroupComponent;
}());



/***/ }),

/***/ "./src/app/make-schedule/make-schedule.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/make-schedule/make-schedule.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  it works!\n</p>\n"

/***/ }),

/***/ "./src/app/make-schedule/make-schedule.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MakeScheduleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MakeScheduleComponent = /** @class */ (function () {
    function MakeScheduleComponent() {
    }
    MakeScheduleComponent.prototype.ngOnInit = function () {
    };
    MakeScheduleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-make-schedule',
            template: __webpack_require__("./src/app/make-schedule/make-schedule.component.html"),
            styles: [__webpack_require__("./src/app/make-schedule/make-schedule.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MakeScheduleComponent);
    return MakeScheduleComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-8\" id=\"lgn\">{{ user }}</div>\n\t<button id=\"signout-button\" class=\"col-2\" (click)=\"handleSignOutClick()\">Sign out</button>\n\t<!-- <div class=\"col-2 g-signin2\" (data-onsuccess)=\"loginName()\"></div> -->\n\t<google-signin\n  \t[clientId]=\"clientID\"\n  \t(googleSignInSuccess)=\"onSuccess($event)\">\n\t</google-signin>\n\t<button (click)=\"test()\">click me</button>\n</div>\n\n\n<!-- [width]=\"width\"\n[theme]=\"theme\"\n[scope]=\"scope\"\n[longTitle]=\"longTitle\" -->\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(db, http) {
        this.db = db;
        this.http = http;
        this.clientID = '123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com';
    }
    NavbarComponent.prototype.ngOnInit = function () { };
    // private clientID: string = 'client 123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com'
    NavbarComponent.prototype.onSuccess = function (event) {
        var googleUser = event.googleUser;
        var idk = gapi.auth2.getAuthInstance().currentUser.get();
        var id = googleUser.getId();
        var profile = googleUser.getBasicProfile();
        // console.log(googleUser.getAuthResponse())
        // console.log(id)
        // console.log(profile)
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        console.log(idk);
        this.user = idk;
        this.http.post('/api/save-user', { auth: idk.getAuthResponse() })
            .subscribe(function (post) {
            console.log(post);
        });
    };
    NavbarComponent.prototype.handleSignOutClick = function (event) {
        gapi.auth2.getAuthInstance().signOut();
    };
    NavbarComponent.prototype.isLoggedIn = function () {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    };
    NavbarComponent.prototype.test = function () {
        var body = { auth: this.user.getAuthResponse() };
        this.http.post('api/clone-sheet', body).
            subscribe(function (post) {
            console.log(post);
        });
    };
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/welcome-page/welcome-page.component.css":
/***/ (function(module, exports) {

module.exports = ".welcome-page {\n}"

/***/ }),

/***/ "./src/app/welcome-page/welcome-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"welcome-page\">\n\t<h3>Welcome</h3>\n\n\tYou should log in!\n</div>"

/***/ }),

/***/ "./src/app/welcome-page/welcome-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WelcomePageComponent = /** @class */ (function () {
    function WelcomePageComponent() {
    }
    WelcomePageComponent.prototype.ngOnInit = function () {
    };
    WelcomePageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-welcome-page',
            template: __webpack_require__("./src/app/welcome-page/welcome-page.component.html"),
            styles: [__webpack_require__("./src/app/welcome-page/welcome-page.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], WelcomePageComponent);
    return WelcomePageComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAIyT1Uzas9K0oAKNBXMej7sTW_dXJRvZk",
        authDomain: "k-ville-schedule-builder.firebaseapp.com",
        databaseURL: "https://k-ville-schedule-builder.firebaseio.com",
        projectId: "k-ville-schedule-builder",
        storageBucket: "k-ville-schedule-builder.appspot.com",
        messagingSenderId: "123382215531"
    }
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map