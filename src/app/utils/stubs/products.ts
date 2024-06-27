import { Provider } from "@angular/core";
import { Product } from "@application/domain/entities/product";
import { IproductInputPort, PRODUCT_INPUT_PORT, ProductList } from "@application/ports/products/input.port";
import { IproductOutputPort, PRODUCT_OUTPUT_PORT } from "@application/ports/products/output.port";
import { API_URL } from "@resources/api";
import { of } from "rxjs";

export class ProductsOutPutAdapterStub implements IproductOutputPort {
    getProducts(_: number, __: number) {
        const productList: ProductList = {
            limit: 1,
            skip: 0,
            products: [new Product(1, 'prod1', 1, 10), new Product(2, 'prod2', 2, 10 )],
            total: 2
        }
        return of(productList);
    }
}

export class ProductsInputAdapterStub implements IproductInputPort {
    getProducts() {
        const productList: ProductList = {
            limit: 1,
            skip: 0,
            products: [new Product(1, 'prod1', 1, 10), new Product(2, 'prod2', 2, 10)],
            total: 2
        }
        return of(productList);
    }

    nextPage() { }
    prevPage() { }
}


export function provideProductsAdapterInputStub(value?: IproductInputPort): Provider {
    return {
        provide: PRODUCT_INPUT_PORT,
        useValue: value || new ProductsInputAdapterStub(),
    }
}
export function provideProductsAdapterOutPutStub(value?: IproductOutputPort): Provider {
    return {
        provide: PRODUCT_OUTPUT_PORT,
        useValue: value || new ProductsOutPutAdapterStub(),
        deps: [API_URL]
    }
}