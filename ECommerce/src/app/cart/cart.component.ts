import { OnInit, Component} from "@angular/core";
import { IProduct, Product } from "../product/product";
import { ProductService } from "../product/product.service";
import { CookieService } from "angular2-cookie/core";
import { Event } from "@angular/router";

@Component({
    selector: 'shopping-cart',
    templateUrl: 'app/cart/cart.component.html',
})

export class CartComponent implements OnInit {
    products: IProduct[];
    statusMsg: string;
    productList: Product[] = [];
    productIDColl: string[] = [];
    quantityColl: string[] = [];
    priceColl: number[] = [];
    prod_ID: string;
    totalPrice: number = 0;
    

    constructor(private _productService: ProductService, private _cookieService: CookieService) { }

    ngOnInit() {
        //Get productID from cookies
        if (this._cookieService.get('user_login') == undefined) {       //Check if login token is on
            let cookieColl = this._cookieService.getAll();      //Get all cookies

            //Fetch prductID and qunatity from cookies
            for (let cookie in cookieColl) {
                this.productIDColl.push(cookie);
                //console.log("product IDs: " + this.productIDColl);
                this.quantityColl.push(this._cookieService.get(cookie));
                //console.log("quantites: " + this.quantityColl);
            }

            //Get product details from database
            for (let i = 0; i < this.productIDColl.length; i++) {
                this.prod_ID = this.productIDColl[i];
                this._productService.getProductById(this.prod_ID).subscribe((productDetails) => {
                    this.products = productDetails;     //Get raw data from database
                    this.productFilter();   //Get productList by filter
                    setTimeout(()=>{this.totalPrice = this.totalPrice + this.priceColl[i] * parseInt(this.quantityColl[i]);}, 200);
                    
                }, (error) => {
                this.statusMsg = "Service Problem!";
                })
            }
        } else {
            //Code for login user
        }
    }

    //Quantity update
    quantityUpdate(e:Event) {
        console.log(e);
    }

    productFilter() {
        console.log("We are in filter.");
        //Object Filter
        var prod = new Product(null, null, null, null, [], []);
        for (let product of this.products) {
            //console.log(prod.productID);
            if (prod.productID != null && prod.productID != product.productID) {
                this.productList.push(prod);
                var prod = new Product(null, null, null, null, [], []);
                console.log(this.productList)
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price);        //Store the price for later using
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            } else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price);        //Store the price for later using
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            } else {
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
    }


}