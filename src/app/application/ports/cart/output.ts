import { InjectionToken } from "@angular/core"
import { Cart, CartProduct } from "@application/domain/entities/cart"
import { Product } from "@application/domain/entities/product"
import { Observable } from "rxjs"

export interface ICartOutputPort {
    persistCart(cart: Cart): Observable<Cart | null>
    getPersistedCart(): Observable<Cart | null>
    getProductFromCart(productId: number): Observable<CartProduct | null>
    getProductFromServer(productId: number): Observable<Product | null>
}
export const CART_OUTPUT_PORT = new InjectionToken<ICartOutputPort>('CART_OUTPUT_PORT')
