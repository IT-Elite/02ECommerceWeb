"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_cookie_1 = require("angular2-cookie");
var window_service_1 = require("../window/window.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_cookieService, window) {
        this._cookieService = _cookieService;
        this.window = window;
        this.orderVisible = true;
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
        this.host = this.window.location.host; //Get the host through window injection
        this.validEmail = true;
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(true);
    };
    //Generate cookie
    LoginComponent.prototype.generateCookie = function (email) {
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); //Set cookie expeirs in 30 days
        var patt_email = /(\w+)[\.\_\-]?(\w+)@(\w+)\.(\w+)\.?(\w?)\.?(\w?)/; //Create email pattern
        var validEmail = patt_email.test(email.value); //Validate email input
        if (!validEmail) {
            alert("Please enter a valid email address!");
            this.validEmail = false;
        }
        if (this._cookieService.get('user_login') == undefined) { //Check if login token is on
            if (this._cookieService.get(email.value) != undefined) {
                return true;
            }
            else {
                this._cookieService.put(email.name, email.value, { expires: date });
            }
            return true;
        }
        else {
            //Code for login user
        }
    };
    //Page turning to order placing
    LoginComponent.prototype.turnToOrder = function () {
        if (this.validEmail) {
            this.window.location.href = "http://" + this.host + "/src/#/order";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoginComponent.prototype, "orderVisible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoginComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LoginComponent.prototype, "visibleChange", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'app/login/login.component.html',
            styleUrls: ['app/login/login.component.css']
        }),
        __param(1, core_1.Inject(window_service_1.WINDOW)),
        __metadata("design:paramtypes", [angular2_cookie_1.CookieService, Window])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map