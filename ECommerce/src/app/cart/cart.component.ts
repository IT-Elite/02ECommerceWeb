import { OnInit, Component} from "@angular/core";
import { IProduct, Product } from "../product/product";
import { ProductService } from "../product/product.service";
import { CookieService } from "angular2-cookie/core";


@Component({
    selector: 'shopping-cart',
    templateUrl: 'app/cart/cart.component.html',
})

export class CartComponent implements OnInit{
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

    //Id tracker
    trackById(index: number, product: any) {
        return product.productID;
    }

    //Quantity update
    onQuantityChange(val: any) {
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));      //Set cookie expeirs in 30 days
        //console.log(val.name)
        //console.log(val.value)
        this._cookieService.put(val.name, val.value, { expires: date });        //update cookie

        //Reset all data storages
        this.productList = [];
        this.productIDColl = [];
        this.priceColl = [];
        this.quantityColl = [];
        this.totalPrice = 0;

        //Refresh page
        this.ngOnInit();
    }

    //Remove item
    removeItem(val: any) {
        console.log(val.name);
        this._cookieService.remove(val.name);

        //Reset all data storages
        this.productList = [];
        this.productIDColl = [];
        this.priceColl = [];
        this.quantityColl = [];
        this.totalPrice = 0;

        //Refresh page
        this.ngOnInit();
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

    //Testing
    testing() {
        console.log("Timing testing...")
        console.log(this.productList)
        console.log(this.priceColl)
    }
}