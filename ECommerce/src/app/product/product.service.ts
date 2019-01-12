import { Injectable, Inject } from '@angular/core';
import { IProduct } from './product';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { WINDOW } from '../window/window.service';

@Injectable()
export class ProductService {
    constructor(private _http: Http, @Inject(WINDOW) private window: Window) { }
    host: string = this.window.location.host;       //Get the host through window injection

    getProducts(): Observable<IProduct[]> {
        return this._http.get("http://" + this.host + "/api/product/getAllProducts").map((response: Response) => <IProduct[]>response.json())
            .catch(this.handleError);
    }

    handleError(e:Response) {
        console.error(e);
        return Observable.throw(e);
    }

    getProductById(productId: string): Observable<IProduct[]> {
        return this._http.get("http://" + this.host + "/api/product/getproductbyid/" + productId).map((response: Response) => <IProduct[]>response.json())
            .catch(this.handleError);
    }

    
    getProductsByCategory(category: string): Observable<IProduct[]> {
        return this._http.get("http://" + this.host + "/api/product/GetProductByCategory/" + category).map((response: Response) => <IProduct[]>response.json())
            .catch(this.handleError);
    }
}