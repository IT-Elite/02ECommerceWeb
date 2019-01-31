export interface IProduct {
    productID: string;
    name: string;
    description: string;
    price: number;
    keyword: string;
    imageURL: string;
    total?: number;
}

export class Product{

   constructor(public productID: string, public name: string, public description: string, public price: number, public keyword: string[], public imageURL: string[]) {
    }
}

export class Prod_top10 {
    constructor(public productID: string, public name: string, public description: string, public price: number, public keyword: string[], public imageURL: string[]
                ,public total: number) {
    }
}