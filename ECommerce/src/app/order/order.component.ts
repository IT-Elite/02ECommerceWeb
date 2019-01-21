import { OnInit, Component } from "@angular/core";
import { IProduct, Product } from "../product/product";
import { ProductService } from "../product/product.service";
import { CookieService } from "angular2-cookie/core";


@Component({
    selector: 'app-order',
    templateUrl: 'app/order/order.component.html'
})

export class OrderComponent implements OnInit {
    products: IProduct[];
    statusMsg: string;
    productList: Product[] = [];
    productIDColl: string[] = [];
    quantityColl: string[] = [];
    priceColl: number[] = [];
    prod_ID: string;
    totalPrice: number = 0;
    showDialog: boolean = false;
    emailAddress: string;

    constructor(private _productService: ProductService, private _cookieService: CookieService) { }

    ngOnInit() {
        //Get productID from cookies
        if (this._cookieService.get('user_login') == undefined) {       //Check if login token is on
            let cookieColl = this._cookieService.getAll();      //Get all cookies

            //Fetch prductID and qunatity from cookies
            for (let cookie in cookieColl) {
                if (cookie !== 'email') {           //Exclude email cookie
                    this.productIDColl.push(cookie);
                    //console.log("product IDs: " + this.productIDColl);
                } else {
                    this.emailAddress = this._cookieService.get("email");
                }
            }

            //Get product details from database
            for (let loop_count = 0; loop_count < this.productIDColl.length; loop_count++) {
                this.prod_ID = this.productIDColl[loop_count];
                this._productService.getProductById(this.prod_ID).subscribe((productDetails) => {
                    this.products = productDetails;     //Get raw data from database
                    this.productFilter();   //Get productList by filter
                    console.log(loop_count);
                    //console.log(this.priceColl[i]);

                    //Calculate total price, but have to wait until finishing data filling
                    setTimeout(() => { this.totalPrice = this.totalPrice + this.priceColl[loop_count] * parseInt(this.quantityColl[loop_count]); }, 3000);
                }, (error) => {
                    this.statusMsg = "Service Problem!";
                })
            }
        } else {
            //Code for login user
        }
    }

    //Checkout dialog visible change
    onVisibleChange(visible: boolean) {
        this.showDialog = visible;
    }


    //Id tracker
    trackById(index: number, product: any) {
        return product.productID;
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
                this.priceColl.push(prod.price);        //Store the price for later use
                this.quantityColl.push(this._cookieService.get(prod.productID));        //Store the quantity for later use
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);
            } else if (prod.productID == null) {
                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                this.priceColl.push(prod.price);        //Store the price for later use
                this.quantityColl.push(this._cookieService.get(prod.productID));        //Store the quantity for later use
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