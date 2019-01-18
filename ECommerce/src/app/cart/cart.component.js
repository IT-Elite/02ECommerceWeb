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
                this.quantityColl.push(this._cookieService.get(cookie));
                //console.log("quantites: " + this.quantityColl);
            }
            var _loop_1 = function (i) {
                this_1.prod_ID = this_1.productIDColl[i];
                this_1._productService.getProductById(this_1.prod_ID).subscribe(function (productDetails) {
                    _this.products = productDetails; //Get raw data from database
                    _this.productFilter(); //Get productList by filter
                    setTimeout(function () { _this.totalPrice = _this.totalPrice + _this.priceColl[i] * parseInt(_this.quantityColl[i]); }, 200);
                }, function (error) {
                    _this.statusMsg = "Service Problem!";
                });
            };
            var this_1 = this;
            //Get product details from database
            for (var i = 0; i < this.productIDColl.length; i++) {
                _loop_1(i);
            }
        }
        else {
            //Code for login user
        }
    };
    //Quantity update
    CartComponent.prototype.quantityUpdate = function (e) {
        console.log(e);
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
                this.priceColl.push(prod.price); //Store the price for later using
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price); //Store the price for later using
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