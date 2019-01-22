import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/productList.component';
import { ProductService } from './product/product.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './navigation/nav.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './navigation/footer.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { WINDOW_PROVIDERS } from './window/window.service';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'order', component: OrderComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/cart', component: CartComponent },
    { path: 'product/:productId', component: ProductComponent },
    { path: 'product/catalog/:category', component: ProductListComponent },
    { path: '**', component:ProductListComponent}
]

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes, { useHash: true })],
    declarations: [ AppComponent, ProductListComponent, ProductComponent, CartComponent, NavComponent, LoginComponent, OrderComponent, HomeComponent, FooterComponent],
    bootstrap: [AppComponent],
    providers: [ProductService, CookieService, WINDOW_PROVIDERS]
})
export class AppModule { }
