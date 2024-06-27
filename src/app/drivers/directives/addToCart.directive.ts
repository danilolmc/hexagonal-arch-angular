import { DestroyRef, Directive, inject, input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Product } from "@application/domain/entities/product";
import { CART_INPUT_PORT } from "@application/ports/cart/input";

@Directive({
    selector: '[addToCart]',
    standalone: true,
    host: {
        '(click)': 'add()'
    }
})
export class AddToCartDirective {
    cartService = inject(CART_INPUT_PORT);
    product = input<Product>({} as Product);
    destroyRef = inject(DestroyRef);

    add() {
        this.cartService.addToCart(this.product()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
    }
}