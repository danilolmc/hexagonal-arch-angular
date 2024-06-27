import { Provider } from "@angular/core"
import { CART_INPUT_PORT } from "@application/ports/cart/input"
import { CART_OUTPUT_PORT } from "@application/ports/cart/output"
import { CartInputAdapter } from "./cart.input.adapter"
import { CartOutputAdapter } from "./cart.output.adapter"

export function provideCartOutputAdapter(): Provider {
    return {
        provide: CART_OUTPUT_PORT,
        useClass: CartOutputAdapter,
    }
}

export function provideCartInputAdapter(): Provider {
    return {
        provide: CART_INPUT_PORT,
        useClass: CartInputAdapter,
    }
}

export function provideCartAdapters(): Provider[] {
    return [
        provideCartOutputAdapter(),
        provideCartInputAdapter()
    ]
}
