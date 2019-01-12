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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var window_service_1 = require("../window/window.service");
var ProductService = /** @class */ (function () {
    function ProductService(_http, window) {
        this._http = _http;
        this.window = window;
        this.host = this.window.location.host; //Get the host through window injection
    }
    ProductService.prototype.getProducts = function () {
        return this._http.get("http://" + this.host + "/api/product/getAllProducts").map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (e) {
        console.error(e);
        return Observable_1.Observable.throw(e);
    };
    ProductService.prototype.getProductById = function (productId) {
        return this._http.get("http://" + this.host + "/api/product/getproductbyid/" + productId).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductsByCategory = function (category) {
        return this._http.get("http://" + this.host + "/api/product/GetProductByCategory/" + category).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(window_service_1.WINDOW)),
        __metadata("design:paramtypes", [http_1.Http, Window])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map