import { OnInit, Component } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Product } from "./product";
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: 'product-list',
    templateUrl: 'app/product/productList.component.html'
})

export class ProductListComponent implements OnInit {
    products: IProduct[];
    statusMsg: string;
    productList: Product[] = [];
    category: string;

    constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        //Get category parameter from url
        this.category = this._activatedRoute.snapshot.params['category'];

        if (this.category == null) {
            this._productService.getProducts().subscribe((productData) => {
                this.products = productData;
                this.productFilter();
            }, (error) => {
                this.statusMsg = "Service Problem!";
            });
        } else {
            this._productService.getProductsByCategory(this.category).subscribe((productData) => {
                this.products = productData;
                this.productFilter();
            }, (error) => {
                this.statusMsg = "Service Problem!";
            });
        }
    }


    productFilter() {
        console.log("We are in filter.");
        //Object Filter
        var prod = new Product(null, null, null,null,[],[]);
        for (let product of this.products) {
            //console.log(prod.productID);

            if (prod.productID != null && prod.productID != product.productID) {        //This loop has got a new product object in prod which is different to the previous one
                this.productList.push(prod);
                var prod = new Product(null, null, null, null, [], []);
                //console.log(this.productList)

                prod.productID = product.productID;
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.keyword.push(product.keyword);
                prod.imageURL.push(product.imageURL);

            } else if (prod.productID==null) {      //This is the first loop and prod is empty
                    prod.productID = product.productID;
                    prod.name = product.name;
                    prod.description = product.description;
                    prod.price = product.price;
                    prod.keyword.push(product.keyword);
                    prod.imageURL.push(product.imageURL);
            } else {        //The existing product in prod has other keywords and images.
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
    }
}