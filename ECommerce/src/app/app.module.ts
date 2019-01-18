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
import { navComponent }  from './navigation/nav.component'

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { WINDOW_PROVIDERS } from './window/window.service';


const appRoutes: Routes = [
    { path: 'product', component: ProductListComponent },
    { path: 'product/cart', component: CartComponent },
    { path: 'product/:productId', component: ProductComponent },
    { path: 'product/catalog/:category', component: ProductListComponent },
    { path: '**', component:ProductListComponent}
]

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes, { useHash: true })],
    declarations: [ AppComponent, ProductListComponent, ProductComponent, CartComponent,navComponent ],
    bootstrap: [AppComponent],
    providers: [ProductService, CookieService, WINDOW_PROVIDERS]
})
export class AppModule { }
