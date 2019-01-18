"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var productList_component_1 = require("./product/productList.component");
var product_service_1 = require("./product/product.service");
var product_component_1 = require("./product/product.component");
var cart_component_1 = require("./cart/cart.component");
var nav_component_1 = require("./navigation/nav.component");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var window_service_1 = require("./window/window.service");
var appRoutes = [
    { path: 'product', component: productList_component_1.ProductListComponent },
    { path: 'product/cart', component: cart_component_1.CartComponent },
    { path: 'product/:productId', component: product_component_1.ProductComponent },
    { path: 'product/catalog/:category', component: productList_component_1.ProductListComponent },
    { path: '**', component: productList_component_1.ProductListComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes, { useHash: true })],
            declarations: [app_component_1.AppComponent, productList_component_1.ProductListComponent, product_component_1.ProductComponent, cart_component_1.CartComponent, nav_component_1.navComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [product_service_1.ProductService, cookies_service_1.CookieService, window_service_1.WINDOW_PROVIDERS]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map