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
var product_1 = require("./product");
var product_service_1 = require("./product.service");
var router_1 = require("@angular/router");
var core_2 = require("angular2-cookie/core");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(_productService, _activatedRoute, _cookieService) {
        this._productService = _productService;
        this._activatedRoute = _activatedRoute;
        this._cookieService = _cookieService;
        this.productList = [];
        this.quantity = 1;
        this.cookieValue = 'unknown';
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Get productID parameter from url
        this.prod_ID = this._activatedRoute.snapshot.params['productId'];
        //Get product details from database
        this._productService.getProductById(this.prod_ID).subscribe(function (productDetails) {
            _this.products = productDetails; //Get raw data from database
            _this.productFilter(); //Get productList by filter
            _this.imgSource = _this.productList[0].imageURL; //Get image array
            _this.imgSource_0 = _this.imgSource[0].toString(); //Get first image
            _this.imgRest = _this.productList[0].imageURL.splice(0); //Clone image array
            _this.imgRest.shift(); //Removing the first element
        }, function (error) {
            _this.statusMsg = "Service Problem!";
        });
    };
    ProductComponent.prototype.productFilter = function () {
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
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else {
                if (prod.keyword.indexOf(product.keyword) < 0) {
                    prod.keyword.push(product.keyword);
                }
                if (prod.imageURL.indexOf(product.imageURL) < 0) {
                    prod.imageURL.push(product.imageURL);
                }
            }
        }
        this.productList.push(prod);
    };
    //Quantity control
    ProductComponent.prototype.quantityMinus = function () {
        //console.log("--");
        if (this.quantity <= 1) {
            return;
        }
        else {
            this.quantity--;
        }
    };
    ProductComponent.prototype.quantityPlus = function () {
        //console.log("++");
        this.quantity++;
    };
    //Cookie generator
    ProductComponent.prototype.generateCookie = function () {
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); //Set cookie expeirs in 30 days
        var quantityValue = this.quantity; //Set quantityValue to quantity
        if (this._cookieService.get('user_login') == undefined) { //Check if login token is on
            if (this._cookieService.get(this.prod_ID) != undefined) {
                quantityValue += parseInt(this._cookieService.get(this.prod_ID));
            }
            this._cookieService.put(this.prod_ID, quantityValue.toString(), { expires: date });
            //Display cookie for testing
            this.cookieValue = this._cookieService.get(this.prod_ID);
        }
        else {
            //Code for login user
        }
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'product-detail',
            templateUrl: 'app/product/product.component.html',
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, router_1.ActivatedRoute, core_2.CookieService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map