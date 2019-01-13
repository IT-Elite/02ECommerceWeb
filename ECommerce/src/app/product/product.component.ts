import { OnInit, Component } from "@angular/core";
import { IProduct, Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";
import { CookieService } from "angular2-cookie/core";

@Component({
    selector: 'product-detail',
    templateUrl: 'app/product/product.component.html',
})

export class ProductComponent implements OnInit {
    products: IProduct[];
    statusMsg: string;
    productList: Product[] = [];
    quantity: number = 1;
    prod_ID: string;
    cookieValue: string = 'unknown';
    imgSource: string[];        //Oringal imageURL array
    imgRest: string[];      //ImageURL array excluding the first element

    constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _cookieService: CookieService) { }

    ngOnInit() {
        //Get productID parameter from url
        this.prod_ID = this._activatedRoute.snapshot.params['productId'];

        //Get product details from database
        this._productService.getProductById(this.prod_ID).subscribe((productDetails) => {
            this.products = productDetails;     //Get raw data from database
            this.productFilter();   //Get productList by filter
            this.imgSource = this.productList[0].imageURL;      //Get image array
            this.imgRest = this.productList[0].imageURL.splice(0);      //Clone image array
            this.imgRest.shift();        //Removing the first element
        }, (error) => {
                this.statusMsg = "Service Problem!";
            })
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
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            } else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            } else {
                if (prod.keyword.indexOf(product.keyword) < 0) {
                    prod.keyword.push(product.keyword);
                }
                if (prod.imageURL.indexOf(product.imageURL) < 0) {
                    prod.imageURL.push(product.imageURL);
                }
            }
        }
        this.productList.push(prod);
    }

    //Quantity control
    quantityMinus() {
        //console.log("--");
        if (this.quantity <= 1) {
            return;
        } else {
            this.quantity--;
        }
    }

    quantityPlus() {
        //console.log("++");
        this.quantity++;
    }

    //Cookie generator
    generateCookie() {
        let cookieNumber = 1;
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));      //Set cookie expeirs in 30 days

        if (this._cookieService.get('user_login') == undefined) {
            console.log(this._cookieService.get('cart_cookie_' + cookieNumber));
            while (this._cookieService.get('cart_cookie_' + cookieNumber) != undefined) {
                cookieNumber += 1;
            }
            this._cookieService.put('cart_cookie_' + cookieNumber, 'productID:' + this.prod_ID + ';' + 'quantity:' + this.quantity, { expires: date });

            //Display cookie for testing
            this.cookieValue = this._cookieService.get('cart_cookie_' + cookieNumber);
        } else {
            return;
        }
    }
}