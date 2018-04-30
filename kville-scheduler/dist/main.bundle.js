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

module.exports = "<div class=\"row\">\n\t<div class=\"col-8\" id=\"lgn\"></div>\n\t<button id=\"signout-button\" class=\"col-2\" (click)=\"handleSignOutClick()\">Sign out</button>\n\t<!-- <div class=\"col-2 g-signin2\" (data-onsuccess)=\"loginName()\"></div> -->\n\t<google-signin\n  \t[clientId]=\"clientID\"\n  \t(googleSignInSuccess)=\"onSuccess($event)\">\n\t</google-signin>\n</div>\n<div>\n\t<div class=\"container\">\n\t\t<h1>K-ville Scheduler</h1>\n\t</div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
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
    function AppComponent(http, userService, router) {
        this.http = http;
        this.userService = userService;
        this.router = router;
        this.title = 'app';
        this.loggedIn = false;
        this.clientID = '123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com';
    }
    // private clientID: string = 'client 123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com'
    AppComponent.prototype.onSuccess = function (event) {
        var _this = this;
        this.loggedIn = true;
        var currentUser = gapi.auth2.getAuthInstance().currentUser.get();
        var profile = currentUser.getBasicProfile();
        this.user = currentUser;
        this.userService.setKey(this.user.getBasicProfile().Eea);
        this.http.post('https://kville-scheduler.herokuapp.com/api/save-user', { auth: this.user.getAuthResponse(), profile: this.user.getBasicProfile() })
            .subscribe(function (post) {
            if (!post.ok)
                console.log(post);
            _this.router.navigate(['pick-group']);
        });
    };
    AppComponent.prototype.test = function () {
        var body = { auth: this.user.getAuthResponse() };
        this.http.post('https://kville-scheduler.herokuapp.com/api/clone-sheet', body).
            subscribe(function (post) {
            if (!post.ok)
                console.log(post);
        });
    };
    AppComponent.prototype.handleSignOutClick = function (event) {
        gapi.auth2.getAuthInstance().signOut();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__welcome_page_welcome_page_component__ = __webpack_require__("./src/app/welcome-page/welcome-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__("./node_modules/angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular_google_signin__ = __webpack_require__("./node_modules/angular-google-signin/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular_google_signin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular_google_signin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__groups_page_groups_page_component__ = __webpack_require__("./src/app/groups-page/groups-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__make_group_make_group_component__ = __webpack_require__("./src/app/make-group/make-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__user_service__ = __webpack_require__("./src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__edit_group_edit_group_component__ = __webpack_require__("./src/app/edit-group/edit-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pick_group_pick_group_component__ = __webpack_require__("./src/app/pick-group/pick-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_pipes__ = __webpack_require__("./node_modules/ngx-pipes/ngx-pipes.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var routes = [
    { path: 'make-group', component: __WEBPACK_IMPORTED_MODULE_13__make_group_make_group_component__["a" /* MakeGroupComponent */] },
    { path: 'edit-group/:group', component: __WEBPACK_IMPORTED_MODULE_15__edit_group_edit_group_component__["a" /* EditGroupComponent */] },
    { path: 'pick-group', component: __WEBPACK_IMPORTED_MODULE_16__pick_group_pick_group_component__["a" /* PickGroupComponent */] },
    { path: 'welcome', component: __WEBPACK_IMPORTED_MODULE_6__welcome_page_welcome_page_component__["a" /* WelcomePageComponent */] },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__welcome_page_welcome_page_component__["a" /* WelcomePageComponent */],
                __WEBPACK_IMPORTED_MODULE_12__groups_page_groups_page_component__["a" /* GroupsPageComponent */],
                __WEBPACK_IMPORTED_MODULE_10_angular_google_signin__["GoogleSignInComponent"],
                __WEBPACK_IMPORTED_MODULE_13__make_group_make_group_component__["a" /* MakeGroupComponent */],
                __WEBPACK_IMPORTED_MODULE_15__edit_group_edit_group_component__["a" /* EditGroupComponent */],
                __WEBPACK_IMPORTED_MODULE_16__pick_group_pick_group_component__["a" /* PickGroupComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_11__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(routes),
                __WEBPACK_IMPORTED_MODULE_17_ngx_pipes__["a" /* NgPipesModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_14__user_service__["a" /* UserService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/edit-group/edit-group.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-group/edit-group.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"col-md-8 offset-md-2\" #editForm=\"ngForm\" (ngSubmit)=\"submit()\">\n  <table >\n    <tr>\n      <th>First Name</th>\n      <th>Last Initial</th>\n      <th>Phone</th>\n      <th>New First Name</th>\n      <th>New Last Initial</th>\n      <th>New Phone</th>\n    </tr>\n    <tr *ngFor=\"let m of members; let i = index\">\n      <td>{{m.first}}</td>\n      <td>{{m.last}}</td>\n      <td>{{m.phone}}</td>\n      <td><input class=\"form-control\" name=\"{{i}}first\" [(ngModel)]=\"newMembers[i].first\" /></td>\n      <td><input class=\"form-control\" name=\"{{i}}last\" [(ngModel)]=\"newMembers[i].last\" /></td>\n      <td><input class=\"form-control\" name=\"{{i}}phone\" [(ngModel)]=\"newMembers[i].phone\" /></td>\n    </tr>\n  </table>\n  <button type=\"submit\" class=\"btn btn-primary\">Submit Changes</button>\n</form>\n"

/***/ }),

/***/ "./src/app/edit-group/edit-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditGroupComponent = /** @class */ (function () {
    function EditGroupComponent(http, userService, router, routes, chRef) {
        var _this = this;
        this.http = http;
        this.userService = userService;
        this.router = router;
        this.routes = routes;
        this.chRef = chRef;
        this.members = [];
        this.newMembers = [];
        this.http.get('https://kville-scheduler.herokuapp.com/api/get-members/' + this.routes.snapshot.params['group'])
            .subscribe(function (post) {
            if (!post.ok)
                console.log(post);
            _this.members = post.json();
            _this.newMembers = post.json();
            _this.chRef.detectChanges();
        });
    }
    EditGroupComponent.prototype.ngOnInit = function () {
    };
    EditGroupComponent.prototype.submit = function () {
        var _this = this;
        this.http.post('https://kville-scheduler.herokuapp.com/api/edit-group', { group: '-LBEax8hyLCpfa_FHIRA', newMembers: this.newMembers }).
            subscribe(function (post) {
            if (!post.ok)
                console.log(post);
            _this.router.navigate(['pick-group']);
        });
    };
    EditGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-group',
            template: __webpack_require__("./src/app/edit-group/edit-group.component.html"),
            styles: [__webpack_require__("./src/app/edit-group/edit-group.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], EditGroupComponent);
    return EditGroupComponent;
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

module.exports = "<form #userForm=\"ngForm\" (ngSubmit)=\"submit()\">\n  <fieldset>\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-6\">\n        <label for=\"groupName\" >Group Name:</label>\n        <input type=\"text\" id=\"groupName\" class=\"form-control\" name=\"group\" [(ngModel)]=\"data.groupName\" placeholder=\"Enter group name here\" required />\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"type\">Group Type:</label><br/>\n        <div class=\"form-check form-check-inline\">\n          <input id=\"tent\" class=\"form-check-input\" type=\"radio\" name=\"type\" value=\"Tent\" (click)=\"tent()\" [(ngModel)]=\"data.type\" required />\n          <label class=\"form-check-label\" for=\"tent\">Tent</label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <input id=\"tent\" class=\"form-check-input\" type=\"radio\" name=\"type\" value=\"WUL\" (click)=\"wul()\" [(ngModel)]=\"data.type\" required />\n          <label class=\"form-check-label\" for=\"tent\">Walk-Up Line</label>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-6\">\n        <label for=\"startDate\">Group Start Date:</label>\n        <input type=\"datetime-local\" id=\"startDate\" class=\"form-control\" name=\"start\" [(ngModel)]=\"data.start\" required />\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"endDate\">Group End Date:</label>\n        <input type=\"datetime-local\" id=\"endDate\" class=\"form-control\" name=\"end\" [(ngModel)]=\"data.end\" required />\n      </div>\n    </div>\n  </fieldset>\n  <fieldset *ngIf=\"data.type==='Tent'\">\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-4\">\n        <label for=\"black\">Black Tenting Start Date:</label>\n        <input type=\"datetime-local\" id=\"black\" class=\"form-control\" name=\"black\" [(ngModel)]=\"tenting.blackStart\" requied />\n      </div>\n      <div class=\"form-group col-md-4\">\n        <label for=\"blue\">Blue Tenting Start Date:</label>\n        <input type=\"datetime-local\" id=\"blue\" class=\"form-control\" name=\"blue\" [(ngModel)]=\"tenting.blueStart\" requied />\n      </div>\n      <div class=\"form-group col-md-4\">\n        <label for=\"white\">White Tenting Start Date:</label>\n        <input type=\"datetime-local\" id=\"white\" class=\"form-control\" name=\"white\" [(ngModel)]=\"tenting.whiteStart\" requied />\n      </div>\n    </div>\n  </fieldset>\n  <fieldset>\n    <div *ngFor=\"let u of data.members; let i=index\">\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-4\">\n          <label for=\"first\">{{ i + 1 }}. Member's First Name:</label>\n          <input type=\"text\" id=\"first\" class=\"form-control\" name=\"{{i}}first\" [(ngModel)]=\"u.first\" placeholder=\"Insert member's first name\" required />\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"last\">{{ i + 1 }}. Member's Last Initial:</label>\n          <input type=\"text\" id=\"last\" class=\"form-control\" name=\"{{i}}last\" [(ngModel)]=\"u.last\" placeholder=\"Insert member's last name\" required />\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"phone\">{{ i + 1 }}. Member's Phone Number:</label>\n          <input type=\"text\" class=\"form-control\" id=\"phone\" name=\"{{i}}phone\" placeholder=\"123-456-7890\" pattern=\"[0-9]{3}-[0-9]{3}-[0-9]{4}\" maxlength=\"12\" [(ngModel)]=\"u.phone\" required />\n        </div>\n      </div>\n    </div>\n  </fieldset>\n  <div>\n    <button *ngIf=\"data.type==='WUL'\" type=\"button\" class=\"btn btn-primary\" (click)=\"addMember()\">Add Member</button>\n    <button *ngIf=\"data.type==='WUL'\" type=\"button\" class=\"btn btn-primary\" (click)=\"removeMember()\">Remove Last Member</button>\n    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!userForm.valid\">Submit Group Members</button>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/make-group/make-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MakeGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
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
    function MakeGroupComponent(http, userService, router, chRef) {
        this.http = http;
        this.userService = userService;
        this.router = router;
        this.chRef = chRef;
        this.data = {
            groupName: "",
            start: "",
            end: "",
            type: "",
            members: [],
        };
        this.tenting = {
            blackStart: "2018-01-12T23:00",
            blueStart: "2018-01-26T23:00",
            whiteStart: "2018-02-09T23:00",
        };
    }
    MakeGroupComponent.prototype.ngOnInit = function () {
    };
    MakeGroupComponent.prototype.addMember = function () {
        for (var i = 0; i < 3; i++) {
            this.data.members.push({
                first: 'Tenter',
                last: JSON.stringify(this.data.members.length + 1),
                phone: '123-456-7890'
            });
        }
        this.chRef.detectChanges();
    };
    MakeGroupComponent.prototype.removeMember = function () {
        for (var i = 0; i < 3; i++) {
            this.data.members.pop();
        }
        if (this.data.members.length === 0) {
            this.addMember();
        }
        this.chRef.detectChanges();
    };
    MakeGroupComponent.prototype.tent = function () {
        this.data.members.length = 0;
        for (var i = 0; i < 4; i++) {
            this.addMember();
        }
    };
    MakeGroupComponent.prototype.wul = function () {
        this.data.members.length = 0;
        this.addMember();
    };
    MakeGroupComponent.prototype.submit = function () {
        var _this = this;
        if (this.data.start > this.data.end) {
            alert("Start date must be before the end date. Please validate your input");
            return;
        }
        this.data['tenting'] = this.tenting;
        var info = {
            data: this.data,
            key: this.userService.getKey()
        };
        console.log('making group');
        this.http.post('https://kville-scheduler.herokuapp.com/api/create-group', info)
            .subscribe(function (post) {
            if (!post.ok)
                console.log(post);
            _this.http.post('https://kville-scheduler.herokuapp.com/api/clone-sheet', { info: info, groupID: post.text() }).subscribe(function (post) {
                _this.router.navigate(['pick-group']);
            });
        });
    };
    MakeGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-make-group',
            template: __webpack_require__("./src/app/make-group/make-group.component.html"),
            styles: [__webpack_require__("./src/app/make-group/make-group.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], MakeGroupComponent);
    return MakeGroupComponent;
}());



/***/ }),

/***/ "./src/app/pick-group/pick-group.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pick-group/pick-group.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"gotGroups\">\n  <a (click)=\"toMakeGroup()\">Make a Group</a>\n  <table>\n    <tr>\n      <th>Group Name</th>\n      <th></th>\n    </tr>\n    <tr *ngFor=\"let g of groups | values\">\n      <td>{{g.name}}</td>\n      <td><a [routerLink]=\"['/edit-group', g.key]\" routerLinkActive=\"active\">Edit Group Members</a></td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/pick-group/pick-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("./src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PickGroupComponent = /** @class */ (function () {
    function PickGroupComponent(userService, http, router, chRef) {
        var _this = this;
        this.userService = userService;
        this.http = http;
        this.router = router;
        this.chRef = chRef;
        this.gotGroups = false;
        this.http.get('https://kville-scheduler.herokuapp.com/api/get-groups/' + this.userService.getKey())
            .subscribe(function (post) {
            console.log(post.json());
            _this.groups = post.json();
            _this.gotGroups = true;
            _this.chRef.detectChanges();
        });
    }
    PickGroupComponent.prototype.ngOnInit = function () {
    };
    PickGroupComponent.prototype.toMakeGroup = function () {
        this.router.navigate(['make-group']);
    };
    PickGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pick-group',
            template: __webpack_require__("./src/app/pick-group/pick-group.component.html"),
            styles: [__webpack_require__("./src/app/pick-group/pick-group.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], PickGroupComponent);
    return PickGroupComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
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

var UserService = /** @class */ (function () {
    function UserService() {
        this.key = "";
    }
    UserService.prototype.setKey = function (k) {
        this.key = k;
    };
    UserService.prototype.getKey = function () {
        return this.key;
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/welcome-page/welcome-page.component.css":
/***/ (function(module, exports) {

module.exports = ".welcome-page {\n}"

/***/ }),

/***/ "./src/app/welcome-page/welcome-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"welcome-page container\">\n\t<h3>Welcome</h3>\n\tYou should log in!\n</div>\n"

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