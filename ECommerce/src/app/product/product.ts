export interface IProduct {
    productID: string;
    name: string;
    description: string;
    price: number;
    keyword: string;
    imageURL: string;
}

export class Product{

   constructor(public productID: string, public name: string, public description: string, public price: number, public keyword: string[], public imageURL: string[]) {
    }
}