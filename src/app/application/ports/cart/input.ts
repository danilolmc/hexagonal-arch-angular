import { InjectionToken } from "@angular/core"
import { CartProduct } from "@application/domain/entities/cart"
import { Product } from "@application/domain/entities/product"
import { Observable } from "rxjs"

export interface ICartInputPort {
    addToCart(cart: Product): Observable<CartProduct | null>
}

export const CART_INPUT_PORT = new InjectionToken<ICartInputPort>('CART_INPUT_PORT')
