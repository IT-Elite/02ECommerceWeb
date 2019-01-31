"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(productID, name, description, price, keyword, imageURL) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.keyword = keyword;
        this.imageURL = imageURL;
    }
    return Product;
}());
exports.Product = Product;
var Prod_top10 = /** @class */ (function () {
    function Prod_top10(productID, name, description, price, keyword, imageURL, total) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.keyword = keyword;
        this.imageURL = imageURL;
        this.total = total;
    }
    return Prod_top10;
}());
exports.Prod_top10 = Prod_top10;
//# sourceMappingURL=product.js.map