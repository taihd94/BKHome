webpackJsonp([1,4],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HouseService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HouseService = (function () {
    function HouseService(http) {
        this.http = http;
    }
    HouseService.prototype.getHouse = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('/house/floors/getfloors', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    HouseService.prototype.addFloor = function (floor) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/house/floors/addfloor', floor, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.deleteFloor = function (floor) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/house/floors/deletefloor', floor, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.getRooms = function (floorId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('/house/floors/' + floorId + '/getrooms', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.deleteRoom = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/house/rooms/deleteroom', id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.addRoom = function (room) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/house/rooms/addroom', room, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService.prototype.updateImgPath = function (query) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/house/rooms/updateimg', query, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HouseService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], HouseService);
    return HouseService;
    var _a;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/house.service.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/validate.service.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        console.log(this.authToken);
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('/users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    UserService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    UserService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    UserService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/user.service.js.map

/***/ }),

/***/ 604:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 604;


/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(740);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/main.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(834),
            styles: [__webpack_require__(799)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/app.component.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_pipes__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_pipes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ngx_pipes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_config_config_component__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_validate_service__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_httpservice_house_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_config_config_navbar_config_navbar_component__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_configv2_configv2_component__ = __webpack_require__(732);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

























var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'config', component: __WEBPACK_IMPORTED_MODULE_14__components_config_config_component__["a" /* ConfigComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'config2', component: __WEBPACK_IMPORTED_MODULE_21__components_configv2_configv2_component__["a" /* Configv2Component */], canActivate: [__WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_config_config_component__["a" /* ConfigComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_config_config_navbar_config_navbar_component__["a" /* ConfigNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_configv2_configv2_component__["a" /* Configv2Component */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__["b" /* CollapseModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__["c" /* AccordionModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__["d" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ngx_pipes__["NgPipesModule"]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__services_validate_service__["a" /* ValidateService */],
                __WEBPACK_IMPORTED_MODULE_16__services_httpservice_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_17__services_httpservice_house_service__["a" /* HouseService */],
                __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/app.module.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigNavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigNavbarComponent = (function () {
    function ConfigNavbarComponent(houseService, authService, router, flashMessage) {
        this.houseService = houseService;
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.selectedFloor = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.checkClick = true;
        this.navbartest = "blhablahb";
    }
    ConfigNavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.houseService.getHouse().subscribe(function (profile) {
            _this.floors = profile.floors;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ConfigNavbarComponent.prototype.addFloor = function (floorname) {
        var _this = this;
        this.houseService.addFloor({ "name": floorname }).subscribe(function (res) {
            if (res.success) {
                _this.flashMessage.show('Success!!!', { cssClass: 'alert-success', timeout: 3000 });
                _this.houseService.getHouse().subscribe(function (profile) {
                    _this.floors = profile.floors;
                }, function (err) {
                    console.log(err);
                    return false;
                });
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-success', timeout: 3000 });
            }
        });
        this.checkClick = !this.checkClick;
    };
    ConfigNavbarComponent.prototype.getFloor = function (name, floorId) {
        this.floorDeletedName = name;
        this.selectedFloor.emit(floorId);
    };
    ConfigNavbarComponent.prototype.deleteFloor = function () {
        var _this = this;
        this.houseService.deleteFloor({ "name": this.floorDeletedName }).subscribe(function (res) {
            if (res.success) {
                _this.flashMessage.show('Success!!!', { cssClass: 'alert-success', timeout: 3000 });
                _this.houseService.getHouse().subscribe(function (profile) {
                    _this.floors = profile.floors;
                }, function (err) {
                    console.log(err);
                    return false;
                });
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ConfigNavbarComponent.prototype, "selectedFloor", void 0);
    ConfigNavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-config-navbar',
            template: __webpack_require__(835),
            styles: [__webpack_require__(800)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__["a" /* HouseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__["a" /* HouseService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _d) || Object])
    ], ConfigNavbarComponent);
    return ConfigNavbarComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/config-navbar.component.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_httpservice_house_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigComponent = (function () {
    function ConfigComponent(validateService, flashMessage, houseService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.houseService = houseService;
        this.router = router;
        this.checkClick = true;
    }
    ConfigComponent.prototype.ngOnInit = function () {
    };
    ConfigComponent.prototype.getRooms = function (floorId) {
        var _this = this;
        this.floorId = floorId;
        this.houseService.getRooms(floorId).subscribe(function (rooms) {
            if (rooms.length) {
                _this.rooms = rooms;
            }
            else {
                _this.rooms = null;
                _this.flashMessage.show('Not found any rooms. Please add new room', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    ConfigComponent.prototype.getDeletedRoom = function (id, name) {
        this.roomDeletedName = name;
        this.roomDeletedId = id;
    };
    ConfigComponent.prototype.deleteRoom = function () {
        var _this = this;
        this.houseService.deleteRoom({ "id": this.roomDeletedId }).subscribe(function (res) {
            if (res.success) {
                _this.flashMessage.show('Success!!!', { cssClass: 'alert-success', timeout: 3000 });
                _this.getRooms(_this.floorId);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    ConfigComponent.prototype.addRoomSubmit = function () {
        var _this = this;
        this.checkClick = true;
        var newRoom = {
            "name": this.roomAddedName,
            "floorId": this.floorId,
            "imgPath": this.roomUrlName
        };
        this.houseService.addRoom(newRoom).subscribe(function (res) {
            if (res.success) {
                _this.flashMessage.show('Success!!!', { cssClass: 'alert-success', timeout: 3000 });
                _this.getRooms(_this.floorId);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-success', timeout: 3000 });
            }
        });
    };
    ConfigComponent.prototype.addImgSubmit = function (roomId) {
        var _this = this;
        console.log(roomId);
        console.log(this.imgUrl);
        var query = {
            "roomId": roomId,
            "imgPath": this.imgUrl
        };
        this.houseService.updateImgPath(query).subscribe(function (res) {
            console.log(res);
            if (res.success) {
                _this.flashMessage.show('Success!!!', { cssClass: 'alert-success', timeout: 3000 });
                _this.getRooms(_this.floorId);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-success', timeout: 3000 });
            }
        });
    };
    ConfigComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(836),
            styles: [__webpack_require__(801)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_httpservice_house_service__["a" /* HouseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_httpservice_house_service__["a" /* HouseService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], ConfigComponent);
    return ConfigComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/config.component.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configv2Component; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Configv2Component = (function () {
    function Configv2Component() {
        this.isCollapsed = false;
    }
    Configv2Component.prototype.ngOnInit = function () {
    };
    Configv2Component.prototype.collapsed = function (event) {
        console.log(event);
    };
    Configv2Component.prototype.expanded = function (event) {
        console.log(event);
    };
    Configv2Component = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-configv2',
            template: __webpack_require__(837),
            styles: [__webpack_require__(802)]
        }), 
        __metadata('design:paramtypes', [])
    ], Configv2Component);
    return Configv2Component;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/configv2.component.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getHouse().subscribe(function (profile) {
            _this.home = profile.home;
            console.log(_this.home);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(838),
            styles: [__webpack_require__(803)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__["a" /* HouseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_httpservice_house_service__["a" /* HouseService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.isCollapsed = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.collapsed = function (event) {
        console.log(event);
    };
    HomeComponent.prototype.expanded = function (event) {
        console.log(event);
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(839),
            styles: [__webpack_require__(804)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/home.component.js.map

/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(userService, router, flashMessage) {
        this.userService = userService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.userService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.userService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000 });
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000 });
                _this.router.navigate(['/login']);
            }
            ;
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(840),
            styles: [__webpack_require__(805)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/login.component.js.map

/***/ }),

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(841),
            styles: [__webpack_require__(806)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            console.log(_this.user);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(842),
            styles: [__webpack_require__(807)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/profile.component.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Required Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Invalid Email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(843),
            styles: [__webpack_require__(808)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/register.component.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ;
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_httpservice_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/taihd94/Projects/BKHome/angular-src/src/environment.js.map

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "body {\n    background-color: #f6f6f6;\n}\n\n.flashMessage {\n  text-align: center;\n  border-radius: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, ".col-sm-2 {\n  margin: 0px 0px;\n  padding: 0px 0px;\n}\n\n.panel {\n  background-color: #272c2f;\n  position: fixed;\n  height: 100vh;\n  width: inherit;\n  padding-top: 20px;\n}\n\n.panel-heading{\n  background-color: #272c2f;\n  cursor: pointer;\n  border: 0px;\n}\n\n.panel-title {\n  font-size: 20px;\n  margin-left: 10px;\n}\n\n.card {\n  padding-top: 0px;\n  padding-left: 10px;\n  overflow: hidden;\n  -webkit-transition: height .5s;\n  transition: height .5s;\n}\n\n.list-floor{\n  position: relative;\n}\n\n\n.list-group-item:hover{\n  border-radius: 0;\n  border-color: inherit;\n}\n\n.list-group-item {\n  margin-right: 0px;\n  background-color: inherit;\n  color: #ffffff;\n  border: 0px;\n  position: relative;\n  cursor: pointer;\n}\n\n.fa {\n  cursor: pointer;\n  color: auto;\n  background-color: inherit;\n  border: 0px;\n}\n\n.fa-minus-circle {\n  margin-right: 10px;\n  color: auto;\n}\n\n.fa-plus-circle {\n  color: white;\n  float: left;\n  margin-top: 8px;\n  margin-right: 5px;\n}\n\n.addFloor {\n  margin-left: 23px;\n  margin-top: 10px;\n}\n\ninput[name=\"floorname\"]{\n  width: 135px;\n  height: 35px;\n  margin-right: 5px;\n}\n\n.modal-title {\n  text-align: center;\n}\n\n.modal-body{\n  margin: 0 auto;\n  text-align: center;\n}\n\n.btn-modal {\n  min-width: 80px;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, ".col-sm-8 {\n  margin: 0px 0px 0px 0px;\n  padding: 0px 0px 0px 0px;\n}\n\n.room{\n  margin-top: 10px;\n}\n.panel {\n  height: auto;\n}\n\n.panel-heading {\n  background-color: #65995e;\n  height: 60px;\n  vertical-align: middle;\n  padding: 0 0;\n}\n\n.title{\n  height: 100%;\n  width: 95%;\n  float: left;\n  cursor: pointer;\n}\n\n.panel-title {\n  position: absolute;\n  font-size: 20px;\n  color: #ffffff;\n  margin-top: 2%;\n  margin-left: 2%;\n}\n\n.panel-title:hover {\n  text-decoration: none;\n}\n\nh2.devices {\n  margin-top: 0px;\n}\n\n\n.block {\n     overflow: hidden;\n     -webkit-transition: height .5s;\n     transition: height .5s;\n}\n\n.fa {\n  cursor: pointer;\n  color: auto;\n  background-color: inherit;\n  border: 0px;\n}\n\n.fa-times {\n  color: auto;\n  float: right;\n  margin-top: 10px;\n  margin-right: 10px;\n}\n\n.fa-plus-circle {\n  color: #65995e;\n  float: left;\n  margin-right: 10px;\n}\n\ninput {\n  height: 30px;\n  margin-right: 10px;\n}\n\n\n.modal-title {\n  text-align: center;\n}\n\n.modal-body{\n  margin: 0 auto;\n  text-align: center;\n}\n\n.btn-modal {\n  min-width: 80px;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n.form-group {\n    float: left;\n    margin-right: 20px;\n}\n\n.addRoom {\n  margin-top: 8px;\n}\n\n.btn-add-room {\n    line-height: 0;\n}\n\n.sensors {\n  margin-top: 20px;\n}\n\n.form-addImageUrl {\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, ".col-sm-2{\n  min-width: 0px;\n}\n.sidebar {\n  background-color: #272c2f;\n  margin: 0px 0px 0px 0px;\n  height: 1000px;\n  width: 200px;\n  position: fixed;\n}\n\n.sidebar2 {\n  background-color: #5b5b5b;\n  margin-left: 200px;\n  height: 1000px;\n  width: 200px;\n  position: fixed;\n  overflow: hidden;\n  -webkit-transition: width .5s;\n  transition: width .5s;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "body {\n  background-color: #EEEEEE;\n}\n.thumbnail img {\n  max-height: 200px;\n}\n\n.thumbnail .description {\n  color: #1F1F1F;\n}\n\n.price {\n  font-weight: bold;\n  font-size: 16px;\n}\n\n/* The switch - the box around the slider */\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {display:none;}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, ".navbar-default {\n  margin: 0px 0px 0px 0px;\n  background-color: #393c3e;\n  border-color: #393c3e;\n}\n\n.navbar {\n    border-radius: 0px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 425,
	"./af.js": 425,
	"./ar": 431,
	"./ar-dz": 426,
	"./ar-dz.js": 426,
	"./ar-ly": 427,
	"./ar-ly.js": 427,
	"./ar-ma": 428,
	"./ar-ma.js": 428,
	"./ar-sa": 429,
	"./ar-sa.js": 429,
	"./ar-tn": 430,
	"./ar-tn.js": 430,
	"./ar.js": 431,
	"./az": 432,
	"./az.js": 432,
	"./be": 433,
	"./be.js": 433,
	"./bg": 434,
	"./bg.js": 434,
	"./bn": 435,
	"./bn.js": 435,
	"./bo": 436,
	"./bo.js": 436,
	"./br": 437,
	"./br.js": 437,
	"./bs": 438,
	"./bs.js": 438,
	"./ca": 439,
	"./ca.js": 439,
	"./cs": 440,
	"./cs.js": 440,
	"./cv": 441,
	"./cv.js": 441,
	"./cy": 442,
	"./cy.js": 442,
	"./da": 443,
	"./da.js": 443,
	"./de": 445,
	"./de-at": 444,
	"./de-at.js": 444,
	"./de.js": 445,
	"./dv": 446,
	"./dv.js": 446,
	"./el": 447,
	"./el.js": 447,
	"./en-au": 448,
	"./en-au.js": 448,
	"./en-ca": 449,
	"./en-ca.js": 449,
	"./en-gb": 450,
	"./en-gb.js": 450,
	"./en-ie": 451,
	"./en-ie.js": 451,
	"./en-nz": 452,
	"./en-nz.js": 452,
	"./eo": 453,
	"./eo.js": 453,
	"./es": 455,
	"./es-do": 454,
	"./es-do.js": 454,
	"./es.js": 455,
	"./et": 456,
	"./et.js": 456,
	"./eu": 457,
	"./eu.js": 457,
	"./fa": 458,
	"./fa.js": 458,
	"./fi": 459,
	"./fi.js": 459,
	"./fo": 460,
	"./fo.js": 460,
	"./fr": 463,
	"./fr-ca": 461,
	"./fr-ca.js": 461,
	"./fr-ch": 462,
	"./fr-ch.js": 462,
	"./fr.js": 463,
	"./fy": 464,
	"./fy.js": 464,
	"./gd": 465,
	"./gd.js": 465,
	"./gl": 466,
	"./gl.js": 466,
	"./he": 467,
	"./he.js": 467,
	"./hi": 468,
	"./hi.js": 468,
	"./hr": 469,
	"./hr.js": 469,
	"./hu": 470,
	"./hu.js": 470,
	"./hy-am": 471,
	"./hy-am.js": 471,
	"./id": 472,
	"./id.js": 472,
	"./is": 473,
	"./is.js": 473,
	"./it": 474,
	"./it.js": 474,
	"./ja": 475,
	"./ja.js": 475,
	"./jv": 476,
	"./jv.js": 476,
	"./ka": 477,
	"./ka.js": 477,
	"./kk": 478,
	"./kk.js": 478,
	"./km": 479,
	"./km.js": 479,
	"./ko": 480,
	"./ko.js": 480,
	"./ky": 481,
	"./ky.js": 481,
	"./lb": 482,
	"./lb.js": 482,
	"./lo": 483,
	"./lo.js": 483,
	"./lt": 484,
	"./lt.js": 484,
	"./lv": 485,
	"./lv.js": 485,
	"./me": 486,
	"./me.js": 486,
	"./mi": 487,
	"./mi.js": 487,
	"./mk": 488,
	"./mk.js": 488,
	"./ml": 489,
	"./ml.js": 489,
	"./mr": 490,
	"./mr.js": 490,
	"./ms": 492,
	"./ms-my": 491,
	"./ms-my.js": 491,
	"./ms.js": 492,
	"./my": 493,
	"./my.js": 493,
	"./nb": 494,
	"./nb.js": 494,
	"./ne": 495,
	"./ne.js": 495,
	"./nl": 497,
	"./nl-be": 496,
	"./nl-be.js": 496,
	"./nl.js": 497,
	"./nn": 498,
	"./nn.js": 498,
	"./pa-in": 499,
	"./pa-in.js": 499,
	"./pl": 500,
	"./pl.js": 500,
	"./pt": 502,
	"./pt-br": 501,
	"./pt-br.js": 501,
	"./pt.js": 502,
	"./ro": 503,
	"./ro.js": 503,
	"./ru": 504,
	"./ru.js": 504,
	"./se": 505,
	"./se.js": 505,
	"./si": 506,
	"./si.js": 506,
	"./sk": 507,
	"./sk.js": 507,
	"./sl": 508,
	"./sl.js": 508,
	"./sq": 509,
	"./sq.js": 509,
	"./sr": 511,
	"./sr-cyrl": 510,
	"./sr-cyrl.js": 510,
	"./sr.js": 511,
	"./ss": 512,
	"./ss.js": 512,
	"./sv": 513,
	"./sv.js": 513,
	"./sw": 514,
	"./sw.js": 514,
	"./ta": 515,
	"./ta.js": 515,
	"./te": 516,
	"./te.js": 516,
	"./tet": 517,
	"./tet.js": 517,
	"./th": 518,
	"./th.js": 518,
	"./tl-ph": 519,
	"./tl-ph.js": 519,
	"./tlh": 520,
	"./tlh.js": 520,
	"./tr": 521,
	"./tr.js": 521,
	"./tzl": 522,
	"./tzl.js": 522,
	"./tzm": 524,
	"./tzm-latn": 523,
	"./tzm-latn.js": 523,
	"./tzm.js": 524,
	"./uk": 525,
	"./uk.js": 525,
	"./uz": 526,
	"./uz.js": 526,
	"./vi": 527,
	"./vi.js": 527,
	"./x-pseudo": 528,
	"./x-pseudo.js": 528,
	"./yo": 529,
	"./yo.js": 529,
	"./zh-cn": 530,
	"./zh-cn.js": 530,
	"./zh-hk": 531,
	"./zh-hk.js": 531,
	"./zh-tw": 532,
	"./zh-tw.js": 532
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 809;


/***/ }),

/***/ 834:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"flashMessage\">\n  <flash-messages></flash-messages>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ 835:
/***/ (function(module, exports) {

module.exports = "<div bsModal #smModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Are you sure you want to delete <b>{{floorDeletedName}}</b> ?</h4>\n      </div>\n      <div class=\"modal-body\">\n        <button type=\"button\" class=\"btn btn-success btn-modal\" (click)=\"smModal.hide()\" (click)=\"deleteFloor()\">Yes</button>\n        <button type=\"button\" class=\"btn btn-danger btn-modal\" (click)=\"smModal.hide()\">No</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"col-sm-2\">\n  <div class=\"panel panel-success\">\n    <div class=\"panel-heading\" (click)=\"height = height ? 0 : el.scrollHeight\">\n      <h3 class=\"panel-title\">HOME</h3>\n    </div>\n    <div\n      class=\"card card-block card-header block\" [style.height]=\"height + 'px'\" #el>\n      <div class=\"panel-body\">\n        <div class=\"row floor\">\n            <div class=\"list-group\">\n              <div class=\"list-floor\" *ngFor=\"let floor of floors | reverse\">\n              <a class=\"list-group-item\" (click)=\"getFloor(floor.name, floor._id)\">\n                <button type=\"button\" class=\"fa fa-minus-circle\" (click)=\"smModal.show()\"></button> {{floor.name}}</a>\n              </div>\n              <div class=\"list-floor addFloor\">\n                <button type=\"button\" class=\"fa fa-plus-circle fa-1x\" (click)=\"checkClick=!checkClick\"></button>\n                <div class=\"form-group\" [hidden]=\"checkClick\">\n                  <input  type=\"text\"\n                          placeholder=\"Floor Name\"\n                          [(ngModel)]=\"floorname\" name=\"floorname\"\n                          class=\"form-control\"\n                          (keyup.enter)=\"addFloor(floorname)\">\n                </div>\n              </div>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 836:
/***/ (function(module, exports) {

module.exports = "<div bsModal #smModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Are you sure you want to delete <b>{{roomDeletedName}}</b> ?</h4>\n      </div>\n      <div class=\"modal-body\">\n        <button type=\"button\" class=\"btn btn-success btn-modal\" (click)=\"smModal.hide()\" (click)=\"deleteRoom()\">Yes</button>\n        <button type=\"button\" class=\"btn btn-danger btn-modal\" (click)=\"smModal.hide()\">No</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <app-config-navbar (selectedFloor)=\"getRooms($event)\"></app-config-navbar>\n  <div class=\"col-sm-8 room\">\n    <flash-messages></flash-messages>\n    <div class=\"listOfRooms\" *ngFor = \"let room of rooms\">\n      <div class=\"panel panel-success\">\n        <div class=\"panel-heading\">\n          <div class=\"title\" (click)=\"height = height ? 0 : el.scrollHeight\">\n            <a href=\"/config#{{room._id}}\" class=\"panel-title\">{{room.name}}</a>\n          </div>\n          <button type=\"button\" class=\"fa fa-times fa-2x\" (click)=\"getDeletedRoom(room._id, room.name)\" (click)=\"smModal.show()\"></button>\n        </div>\n        <div class=\"card card-block card-header block\" [style.height]=\"height + 'px'\" #el>\n          <div class=\"panel-body\">\n            <div class=\"row\">\n              <div class=\"col-sm-4\">\n                <div class=\"roomImage\">\n                  <div class=\"imgAvailable\" *ngIf = \"room.imgPath\">\n                    <img src=\"{{room.imgPath}}\"\n                         class=\"img-responsive roomImg\"\n                         alt=\"Responsive image\">\n                  </div>\n                  <div class=\"imgNotAvailable\" *ngIf = \"!room.imgPath\" [hidden] = \"checkImgClick\">\n                    <img src=\"http://i.imgur.com/FQk1REK.jpg\"\n                         class=\"img-responsive roomImg\"\n                         alt=\"Responsive image\">\n                     <form (submit)=\"addImgSubmit(room._id)\">\n                     <div class=\"form-group form-addImageUrl\">\n                           <input type=\"text\"\n                                   class=\"form-control\"\n                                   [(ngModel)]=\"imgUrl\" name=\"imgUrl\"\n                                   placeholder=\"Add image url\"\n                                   required>\n                       </div>\n                     </form>\n                  </div>\n                </div>\n                <div class=\"sensors\">\n                  <p><i class=\"fa fa-thermometer-three-quarters\" aria-hidden=\"true\"></i> Temperature: 20 oC</p>\n                  <p><i class=\"fa fa-tint\" aria-hidden=\"true\"></i> Humidity: 60 % </p>\n                  <p><i class=\"fa fa-sun-o\" aria-hidden=\"true\"></i> Light: 150 Lux </p>\n                </div>\n              </div>\n              <div class=\"col-sm-8\">\n                <h2 class=\"devices collapse in\">Devices</h2>\n                <div class=\"list-group\">\n                  <a href=\"/config\" class=\"list-group-item\">Light 1</a>\n                  <a href=\"/config\" class=\"list-group-item\">Light 2</a>\n                  <a href=\"/config\" class=\"list-group-item\">Light 3</a>\n                  <a href=\"/config\" class=\"list-group-item\">Light 4</a>\n                  <a href=\"/config\" class=\"list-group-item\">Sensor 1</a>\n                  <a href=\"/config\" class=\"list-group-item\">Sensor 2</a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"addRoom\" [hidden]=\"!floorId\">\n      <button type=\"button\" class=\"fa fa-plus-circle fa-2x\" (click)=\"checkClick=!checkClick\"></button>\n      <div class=\"input\" [hidden]=\"checkClick\" >\n        <form (submit)=\"addRoomSubmit()\">\n        <div class=\"form-group\">\n              <input type=\"text\"\n                      class=\"form-control\"\n                      [(ngModel)]=\"roomAddedName\" name=\"roomAddedName\"\n                      placeholder=\"Room name\"\n                      required>\n          </div>\n          <input type=\"submit\" class=\"btn btn-success btn-add-room\" value=\"Add\">\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 837:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-2 sidebar\">\n    <button type=\"button\" class=\"btn btn-primary\"\n        (click)=\"width = width ? 0 : 200\">Toggle collapse\n    </button>\n    <ul>\n      <li>HOME</li>\n      <li>HOME</li>\n      <li>HOME</li>\n      <li>HOME</li>\n    </ul>\n  </div>\n  <div class=\"col-sm-2 sidebar2\" [style.width]=\"width + 'px'\" #el>\n    <p>ljslkjaslkjflaskjdf</p>\n  </div>\n  <div class=\"col-sm-8 content\">\n\n  </div>\n</div>\n"

/***/ }),

/***/ 838:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Dashboard</h2>\n<div class=\"row\">\n    <div class=\"col-sm-4 col-md-4\">\n        <div class=\"thumbnail\">\n            <div class=\"caption\">\n                <h3>room</h3>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-sm-4 col-md-4\">\n        <div class=\"thumbnail\">\n            <div class=\"caption\">\n                <h3>room</h3>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n                <div class=\"clearfix\">\n                    <div class=\"price pull-left\">light</div>\n                      <label class=\"switch pull-right\">\n                          <input type=\"checkbox\" checked data-toggle=\"toggle\">\n                          <div class=\"slider round\"></div>\n                      </label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 839:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"jumbotron text-center\">\n    <h1>BKHome Project</h1>\n    <p class=\"lead\">Welcome blahblah blahbla</p>\n    <div>\n      <a class=\"btn btn-primary\" [routerLink]=\"['/register']\">Register</a>\n      <a class=\"btn btn-default\" [routerLink]=\"['/login']\">Login</a>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <h3>Express backend</h3>\n      <p>A rock solid Nodejs/Express server using Mongoose</p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>Angular-CLI</h3>\n      <p>Angular-CLI blah blah blah balh</p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>JWT Token</h3>\n      <p>JSON Web Token blah blah blah balh</p>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 840:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2 class=\"page-header\">Login</h2>\n  <form (submit)=\"onLoginSubmit()\">\n    <div class=\"form-group\">\n        <label>Username</label>\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\n    </div>\n    <div class=\"form-group\">\n        <label>Password</label>\n        <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n    </div>\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"login\">\n  </form>\n</div>\n"

/***/ }),

/***/ 841:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">BKHome</a>\n    </div>\n    <div id=\"navbar\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-left\">\n        <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/']\">Home</a></li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/dashboard']\">Dashboard</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/config']\">Config</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/config2']\">Config2</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/profile']\">Profile</a></li>\n        <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/login']\">Login</a></li>\n        <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]={exact:true}><a [routerLink] = \"['/register']\">Register</a></li>\n        <li  *ngIf=\"authService.loggedIn()\"><a (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\n      </ul>\n    </div><!--/.nav-collapse -->\n  </div>\n</nav>\n\n<nav class=\"navbar navbar-default\">\n</nav>\n"

/***/ }),

/***/ 842:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"user\">\n    <h2 class=\"page-header\">{{user.name}}</h2>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item\">Username: {{user.username}}</li>\n      <li class=\"list-group-item\">Email: {{user.email}}</li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ 843:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2 class=\"page-header\">Register</h2>\n  <form (submit)=\"onRegisterSubmit()\">\n    <div class=\"form-group\">\n      <label>Name</label>\n      <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <label>Username</label>\n      <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <label>Email</label>\n      <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <label>Password</label>\n      <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\n    </div>\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n  </form>\n\n</div>\n"

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(605);


/***/ })

},[873]);
//# sourceMappingURL=main.bundle.js.map