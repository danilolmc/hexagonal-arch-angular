import { ICartOutputPort } from "@application/ports/cart/output";
import { catchError, map, of, switchMap } from "rxjs";
import { Cart } from '../entities/cart';
import { Product } from '../entities/product';


export class AddToCartService {

    private port: ICartOutputPort;

    constructor(private outputPort: ICartOutputPort) {
        this.port = this.outputPort;
    }

    addToCart(product: Product) {
        return this.port.getProductFromServer(product.id).pipe(
            switchMap((updatedProduct) => (
                this.port.getPersistedCart().pipe(map(persistedCart => (
                    {
                        updatedProduct: updatedProduct
                            ? new Product(updatedProduct.id, updatedProduct.title, updatedProduct.price, updatedProduct.stock)
                            : null,
                        persistedCart
                    })))
            )),
            switchMap(({ updatedProduct, persistedCart }) => {
                const cart = new Cart(!!persistedCart?.cartList ? persistedCart.cartList : []);

                if (!updatedProduct) return of(null);

                const attempt = cart.addToCart(updatedProduct);

                if (attempt) {
                    return this.port.persistCart(cart).pipe(
                        map(cartReturn => cartReturn ? cart.getCartProduct(product.id) : cartReturn),
                    )
                }

                return of(null)
            }),
            catchError(() => of(null))
        )
    }
}
