import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { ProductList } from "./input.port";

export interface IproductOutputPort {
    getProducts(limit: number, skip: number): Observable<ProductList>;
}

export const PRODUCT_OUTPUT_PORT = new InjectionToken<IproductOutputPort>('PRODUCT_OUTPUT_PORT')