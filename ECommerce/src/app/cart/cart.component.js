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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_1 = require("../product/product");
var product_service_1 = require("../product/product.service");
var core_2 = require("angular2-cookie/core");
var CartComponent = /** @class */ (function () {
    function CartComponent(_productService, _cookieService) {
        this._productService = _productService;
        this._cookieService = _cookieService;
        this.productList = [];
        this.productIDColl = [];
        this.quantityColl = [];
        this.priceColl = [];
        this.totalPrice = 0;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Get productID from cookies
        if (this._cookieService.get('user_login') == undefined) { //Check if login token is on
            var cookieColl = this._cookieService.getAll(); //Get all cookies
            //Fetch prductID and qunatity from cookies
            for (var cookie in cookieColl) {
                this.productIDColl.push(cookie);
                //console.log("product IDs: " + this.productIDColl);
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
    CartComponent.prototype.trackById = function (index, product) {
        return product.productID;
    };
    //Quantity update
    CartComponent.prototype.onQuantityChange = function (val) {
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); //Set cookie expeirs in 30 days
        //console.log(val.name)
        //console.log(val.value)
        this._cookieService.put(val.name, val.value, { expires: date }); //update cookie
        //Reset all data storages
        this.productList = [];
        this.productIDColl = [];
        this.priceColl = [];
        this.quantityColl = [];
        this.totalPrice = 0;
        //Refresh page
        this.ngOnInit();
    };
    //Remove item
    CartComponent.prototype.removeItem = function (val) {
        console.log(val.name);
        this._cookieService.remove(val.name);
        //Reset all data storages
        this.productList = [];
        this.productIDColl = [];
        this.priceColl = [];
        this.quantityColl = [];
        this.totalPrice = 0;
        //Refresh page
        this.ngOnInit();
    };
    CartComponent.prototype.productFilter = function () {
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
    //Testing
    CartComponent.prototype.testing = function () {
        console.log("Timing testing...");
        console.log(this.productList);
        console.log(this.priceColl);
    };
    CartComponent = __decorate([
        core_1.Component({
            selector: 'shopping-cart',
            templateUrl: 'app/cart/cart.component.html',
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, core_2.CookieService])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map