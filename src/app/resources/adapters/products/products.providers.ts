import { Provider } from "@angular/core";
import { PRODUCT_INPUT_PORT } from "@application/ports/products/input.port";
import { PRODUCT_OUTPUT_PORT } from "@application/ports/products/output.port";
import { API_URL } from "@resources/api";
import { ProductsInputAdapter } from "./products.input.adapter";
import { ProductsOutPutAdapter } from "./products.output.adapter";

export function provideProductsInputAdapter(): Provider {
    return {
        provide: PRODUCT_INPUT_PORT,
        useClass: ProductsInputAdapter,
    }
}

export function provideProductsOutputAdapter(): Provider {
    return {
        provide: PRODUCT_OUTPUT_PORT,
        useClass: ProductsOutPutAdapter,
        deps: [API_URL]
    }
}


export function provideProductsAdapters(): Provider[] {
    return [
        provideProductsInputAdapter(),
        provideProductsOutputAdapter(),
    ];
}
