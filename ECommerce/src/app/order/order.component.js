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
var product_1 = require("../product/product");
var product_service_1 = require("../product/product.service");
var core_2 = require("angular2-cookie/core");
var window_service_1 = require("../window/window.service");
var OrderComponent = /** @class */ (function () {
    function OrderComponent(_productService, _cookieService, window) {
        this._productService = _productService;
        this._cookieService = _cookieService;
        this.window = window;
        this.productList = [];
        this.productIDColl = [];
        this.quantityColl = [];
        this.priceColl = [];
        this.totalPrice = 0;
        this.host = this.window.location.host; //Get the host through window injection
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Get productID from cookies
        if (this._cookieService.get('user_login') == undefined) { //Check if login token is on
            var cookieColl = this._cookieService.getAll(); //Get all cookies
            //Fetch prductID and qunatity from cookies
            for (var cookie in cookieColl) {
                if (cookie !== 'email') { //Exclude email cookie
                    this.productIDColl.push(cookie);
                    //console.log("product IDs: " + this.productIDColl);
                }
                else {
                    this.emailAddress = this._cookieService.get("email");
                }
            }
            var _loop_1 = function (loop_count) {
                this_1.prod_ID = this_1.productIDColl[loop_count];
                this_1._productService.getProductById(this_1.prod_ID).subscribe(function (productDetails) {
                    _this.products = productDetails; //Get raw data from database
                    _this.productFilter(); //Get productList by filter
                    console.log(loop_count);
                    //console.log(this.priceColl[i]);
                    //Calculate total price, but have to wait until finishing data filling
                    setTimeout(function () { _this.totalPrice = _this.totalPrice + _this.priceColl[loop_count] * parseInt(_this.quantityColl[loop_count]); }, 3000);
                }, function (error) {
                    _this.statusMsg = "Service Problem!";
                });
            };
            var this_1 = this;
            //Get product details from database
            for (var loop_count = 0; loop_count < this.productIDColl.length; loop_count++) {
                _loop_1(loop_count);
            }
        }
        else {
            //Code for login user
        }
    };
    //Id tracker
    OrderComponent.prototype.trackById = function (index, product) {
        return product.productID;
    };
    OrderComponent.prototype.productFilter = function () {
        console.log("We are in filter.");
        //Object Filter
        var prod = new product_1.Product(null, null, null, null, [], []);
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            //console.log(prod.productID);
            if (prod.productID != null && prod.productID != product.productID) {
                this.productList.push(prod);
                var prod = new product_1.Product(null, null, null, null, [], []);
                console.log(this.productList);
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price); //Store the price for later use
                this.quantityColl.push(this._cookieService.get(prod.productID)); //Store the quantity for later use
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price); //Store the price for later use
                this.quantityColl.push(this._cookieService.get(prod.productID)); //Store the quantity for later use
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else {
                if (prod.keyword.indexOf(product.keyword) < 0) {
                    prod.keyword.push(product.keyword);
                }
                //Only need the first image
                //if (prod.imageURL.indexOf(product.imageURL) < 0) {
                //    prod.imageURL.push(product.imageURL);
                //}
            }
        }
        this.productList.push(prod);
    };
    OrderComponent = __decorate([
        core_1.Component({
            selector: 'app-order',
            templateUrl: 'app/order/order.component.html'
        }),
        __param(2, core_1.Inject(window_service_1.WINDOW)),
        __metadata("design:paramtypes", [product_service_1.ProductService, core_2.CookieService, Window])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map