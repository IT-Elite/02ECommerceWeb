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
var product_2 = require("./product");
var router_1 = require("@angular/router");
var pagination_service_1 = require("../pagination/pagination.service");
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(_productService, _activatedRoute, _pagerService, _router) {
        this._productService = _productService;
        this._activatedRoute = _activatedRoute;
        this._pagerService = _pagerService;
        this._router = _router;
        this.productList = []; //Union type to hold either Product or Prod_top10 objects
        // pager object
        this.pager = {};
    }
    ProductListComponent.prototype.ngOnInit = function () {
        //Get category parameter from url
        var _this = this;
        this._activatedRoute.paramMap.subscribe(function (params) {
            _this.category = params.get('category');
            console.log("The param is " + _this.category);
            //Reset all global storages
            _this.products = [];
            _this.productList = [];
            if (_this.category == null) {
                _this._productService.getProducts().subscribe(function (productData) {
                    _this.products = productData;
                    _this.productFilter();
                    _this.setPage(1);
                    _this._router.navigate(['/product']);
                }, function (error) {
                    _this.statusMsg = "Service Problem!";
                });
            }
            else {
                console.log("we are in else: " + _this.category);
                if (_this.category == "top10") {
                    _this._productService.getProductsTop10().subscribe(function (productData) {
                        _this.products = productData;
                        _this.productFilter_Top10();
                        _this.setPage(1);
                        _this._router.navigate(['product/catalog/top10']);
                    }, function (error) {
                        _this.statusMsg = "Service Problem!";
                    });
                }
                else {
                    _this._productService.getProductsByCategory(_this.category).subscribe(function (productData) {
                        _this.products = productData;
                        _this.productFilter();
                        _this.setPage(1);
                        _this._router.navigate(['product/catalog', _this.category]);
                    }, function (error) {
                        _this.statusMsg = "Service Problem!";
                    });
                }
            }
        });
    };
    ProductListComponent.prototype.ngOnDestroy = function () {
    };
    //Product filter to combine imgURL and category keywords
    ProductListComponent.prototype.productFilter = function () {
        //console.log("We are in filter.");
        //Object Filter
        var prod = new product_2.Product(null, null, null, null, [], []);
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            //console.log(prod.productID);
            if (prod.productID != null && prod.productID != product.productID) { //This loop has got a new product object in prod which is different to the previous one
                this.productList.push(prod);
                var prod = new product_2.Product(null, null, null, null, [], []);
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
    ProductListComponent.prototype.productFilter_Top10 = function () {
        console.log("We are in top-10 filter.");
        //Object Filter
        var prod = new product_1.Prod_top10(null, null, null, null, [], [], null);
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            //console.log(prod.productID);
            if (prod.productID != null && prod.productID != product.productID) { //This loop has got a new product object in prod which is different to the previous one
                this.productList.push(prod);
                var prod = new product_1.Prod_top10(null, null, null, null, [], [], null);
                //console.log(this.productList)
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
                prod.total = product.total; //Get total sale number
            }
            else if (prod.productID == null) { //This is the first loop and prod is empty
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
                prod.total = product.total; //Get total sale number
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
        //console.log(this.pagedItems)
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'product-list',
            templateUrl: 'app/product/productList.component.html'
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, router_1.ActivatedRoute, pagination_service_1.PagerService, router_1.Router])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=productList.component.js.map