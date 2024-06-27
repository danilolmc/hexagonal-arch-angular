import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Product } from "@application/domain/entities/product";
import { provideCartAdapterInputStub } from "@utils/stubs/cart";
import { AddToCartDirective } from "./addToCart.directive";
import { CART_INPUT_PORT, ICartInputPort } from "@application/ports/cart/input";

@Component({
    standalone: true,
    imports: [AddToCartDirective],
    template: '<button addToCart [product]="product">Add to cart</button>'
})
class DumbComponent {
    product: Product | undefined = undefined;
}

describe('AddToCart Directive', () => {
    let component: DumbComponent;
    let componentFixture: ComponentFixture<DumbComponent>;
    let cartService: ICartInputPort;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [DumbComponent],
            providers: [
                provideCartAdapterInputStub()
            ],
        }).compileComponents();
        
        componentFixture = TestBed.createComponent(DumbComponent);
        component = componentFixture.componentInstance;
        cartService = TestBed.inject(CART_INPUT_PORT);
    })

    it('shoud add product to cart when element with directive selector is clicked', () => {
        component.product = new Product(123, 'test product', 100, 10);

        componentFixture.detectChanges();

        const button: HTMLButtonElement = componentFixture.debugElement.query(By.directive(AddToCartDirective)).nativeElement;

        jest.spyOn(cartService, 'addToCart');

        button.click();
        
        expect(component.product).toBeDefined()
        expect(cartService.addToCart).toHaveBeenCalledWith(component.product)
    })
})