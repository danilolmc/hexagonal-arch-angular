import { Provider } from "@angular/core";
import { Cart } from "@application/domain/entities/cart";
import { Product } from "@application/domain/entities/product";
import { CART_INPUT_PORT, ICartInputPort } from "@application/ports/cart/input";
import { CART_OUTPUT_PORT, ICartOutputPort } from "@application/ports/cart/output";
import { of } from "rxjs";

export class CartOutPutAdapterStub implements ICartOutputPort {

    private cart: Cart | null = null;

    persistCart(cart: Cart) {
        this.cart = cart
        return of(this.cart)
    }

    getPersistedCart() {
        return of(this.cart)
    }

    getProductFromCart(productId: number) {
        if (this.cart) {
            const product = this.cart.getCartProduct(productId);
            return of(product)
        }

        return of(null);
    }

    getProductFromServer(productId: number) {
        return of({ id: productId, title: 'random title', price: 10.99, stock: 10 } as Product);
    }
}

export class CartInputAdapterStub implements ICartInputPort {

    addToCart(product: Product) {
        return of({
            amountOnCart: 1,
            product: product
        });
    }
}


export function provideCartAdapterInputStub(value?: ICartInputPort): Provider {
    return {
        provide: CART_INPUT_PORT,
        useValue: value ?? new CartInputAdapterStub(),
    }
}
export function provideCartAdapterOutPutStub(value?: ICartOutputPort): Provider {
    return {
        provide: CART_OUTPUT_PORT,
        useValue: value ?? new CartOutPutAdapterStub(),
    }
}