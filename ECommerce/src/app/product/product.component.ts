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
    imgSource_0: string;
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
            this.imgSource_0 = this.imgSource[0].toString();        //Get first image
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
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));      //Set cookie expeirs in 30 days
        let quantityValue = this.quantity;     //Set quantityValue to quantity

        if (this._cookieService.get('user_login') == undefined) {       //Check if login token is on
            if (this._cookieService.get(this.prod_ID) != undefined) {
                quantityValue += parseInt(this._cookieService.get(this.prod_ID));
            }
            this._cookieService.put(this.prod_ID, quantityValue.toString(), { expires: date });

            //Display cookie for testing
            alert("Item added to your shopping cart");
        } else {
            //Code for login user
        }
    }
}