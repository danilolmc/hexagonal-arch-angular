import { InjectionToken } from "@angular/core";
import { Product } from "@application/domain/entities/product";
import { Observable } from 'rxjs';


export interface ProductList {
    total: number
    skip: number
    limit: number
    products: Product[]
}

export interface IproductInputPort {
    getProducts(): Observable<ProductList>;
    nextPage(): void;
    prevPage(): void;
}

export const PRODUCT_INPUT_PORT = new InjectionToken<IproductInputPort>('PRODUCT_INPUT_PORT')