import { Injectable, Provider, inject } from "@angular/core";
import { Product } from "@application/domain/entities/product";
import { AddToCartService } from "@application/domain/use_cases/AddToCart";
import { CART_INPUT_PORT, ICartInputPort } from "@application/ports/cart/input";
import { CART_OUTPUT_PORT } from "@application/ports/cart/output";

@Injectable({ providedIn: 'root' })
export class CartInputAdapter implements ICartInputPort {

    private cartOutPort = inject(CART_OUTPUT_PORT);
    private cartApplication = new AddToCartService(this.cartOutPort);

    addToCart(product: Product) {
        const productAdded = this.cartApplication.addToCart(product);
        return productAdded;
    }
}

export function provideCartInputAdapter(): Provider {
    return {
        provide: CART_INPUT_PORT,
        useClass: CartInputAdapter,
    }
}
