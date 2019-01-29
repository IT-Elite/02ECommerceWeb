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
var product_service_1 = require("./product.service");
var product_1 = require("./product");
var router_1 = require("@angular/router");
var pagination_service_1 = require("../pagination/pagination.service");
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(_productService, _activatedRoute, _pagerService) {
        this._productService = _productService;
        this._activatedRoute = _activatedRoute;
        this._pagerService = _pagerService;
        this.productList = [];
        // pager object
        this.pager = {};
    }
    ProductListComponent.prototype.ngOnInit = function () {
        //Get category parameter from url
        var _this = this;
        this.category = this._activatedRoute.snapshot.params['category'];
        //console.log(this.category);
        if (this.category == null) {
            this._productService.getProducts().subscribe(function (productData) {
                _this.products = productData;
                _this.productFilter();
                _this.setPage(1);
            }, function (error) {
                _this.statusMsg = "Service Problem!";
            });
        }
        else {
            console.log("we are in else: " + this.category);
            this._productService.getProductsByCategory(this.category).subscribe(function (productData) {
                _this.products = productData;
                _this.productFilter();
                _this.setPage(1);
            }, function (error) {
                _this.statusMsg = "Service Problem!";
            });
        }
    };
    ProductListComponent.prototype.ngOnDestroy = function () {
    };
    ProductListComponent.prototype.productFilter = function () {
        console.log("We are in filter.");
        //Object Filter
        var prod = new product_1.Product(null, null, null, null, [], []);
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            //console.log(prod.productID);
            if (prod.productID != null && prod.productID != product.productID) { //This loop has got a new product object in prod which is different to the previous one
                this.productList.push(prod);
                var prod = new product_1.Product(null, null, null, null, [], []);
                //console.log(this.productList)
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else if (prod.productID == null) { //This is the first loop and prod is empty
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            }
            else { //The existing product in prod has other keywords and images.
                if (prod.keyword.indexOf(product.keyword) < 0) {
                    prod.keyword.push(product.keyword);
                }
                //For product list, only the first image would be shown.
                //if (prod.imageURL.indexOf(product.imageURL) < 0) {
                //    prod.imageURL.push(product.imageURL);
                //}
            }
        }
        this.productList.push(prod);
    };
    //Pagination
    ProductListComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._pagerService.getPager(this.productList.length, page);
        // get current page of items
        this.pagedItems = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'product-list',
            templateUrl: 'app/product/productList.component.html'
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, router_1.ActivatedRoute, pagination_service_1.PagerService])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=productList.component.js.map