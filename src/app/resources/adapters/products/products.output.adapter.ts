import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ProductList } from "@application/ports/products/input.port";
import { IproductOutputPort } from "@application/ports/products/output.port";
import { API_URL } from "@resources/api";

@Injectable({ providedIn: 'root' })
export class ProductsOutPutAdapter implements IproductOutputPort {
    private api = inject(API_URL);
    private httpClient = inject(HttpClient);

    getProducts(limit: number, skip: number) {
        return this.httpClient.get<ProductList>(`${this.api}/?limit=${limit}&skip=${skip}`);
    }
}