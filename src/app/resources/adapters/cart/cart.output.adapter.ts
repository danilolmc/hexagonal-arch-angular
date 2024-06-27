import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Cart } from "@application/domain/entities/cart";
import { Product } from "@application/domain/entities/product";
import { ICartOutputPort } from "@application/ports/cart/output";
import { API_URL } from "@resources/api";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CartOutputAdapter implements ICartOutputPort {
    private httpClient = inject(HttpClient)
    private apiEndpoint = inject(API_URL)

    persistCart(cart: Cart) {
        sessionStorage.setItem('cart', JSON.stringify(cart));

        const stored = sessionStorage.getItem('cart');

        if (!stored) return of(null);

        return of(JSON.parse(stored) as Cart);
    }

    getPersistedCart() {
        const cart = sessionStorage.getItem('cart');

        if (!cart) return of(null);

        const parsed = JSON.parse(cart) as Cart;

        return of(parsed);
    }

    getProductFromCart(productId: number) {
        const cart = sessionStorage.getItem('cart');

        if (!cart) return of(null);

        const product = (JSON.parse(cart) as Cart).getCartProduct(productId);

        return of(product)
    }

    getProductFromServer(productId: number) {
        return this.httpClient.get<Product | null>(`${this.apiEndpoint}/${productId}`);
    }
}

