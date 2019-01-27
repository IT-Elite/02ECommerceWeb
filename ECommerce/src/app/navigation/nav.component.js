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
var window_service_1 = require("../window/window.service");
var NavComponent = /** @class */ (function () {
    function NavComponent(window) {
        this.window = window;
        this.host = this.window.location.host; //Get the host through window injection
    }
    NavComponent.prototype.refresh = function () {
        this.window.location.reload();
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'my-nav',
            templateUrl: 'app/navigation/nav.component.html',
            styleUrls: ['app/navigation/nav.component.html']
        }),
        __param(0, core_1.Inject(window_service_1.WINDOW)),
        __metadata("design:paramtypes", [Window])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map