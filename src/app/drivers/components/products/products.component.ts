import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PRODUCT_INPUT_PORT } from "@application/ports/products/input.port";
import { AddToCartDirective } from "@drivers/directives/addToCart.directive";
import { provideCartAdapters } from "@resources/adapters/cart/cart.providers";
import { provideProductsAdapters } from "@resources/adapters/products/products.providers";
import { provideApi } from "@resources/api";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    standalone: true,
    imports: [AddToCartDirective, CommonModule],
    providers: [
        provideApi('product'),
        ...provideCartAdapters(),
        ...provideProductsAdapters(),
    ],
})
export class HomeProductComponent {
    productService = inject(PRODUCT_INPUT_PORT);
    products = this.productService.getProducts();   
}