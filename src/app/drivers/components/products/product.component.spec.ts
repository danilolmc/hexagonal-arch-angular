

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart } from '@application/domain/entities/cart';
import { Product } from '@application/domain/entities/product';
import { CART_OUTPUT_PORT, ICartOutputPort } from '@application/ports/cart/output';
import { ProductList } from '@application/ports/products/input.port';
import { IproductOutputPort, PRODUCT_OUTPUT_PORT } from '@application/ports/products/output.port';
import { AddToCartDirective } from '@drivers/directives/addToCart.directive';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { provideCartInputAdapter } from '@resources/adapters/cart/cart.input.adapter';
import { provideProductsInputAdapter } from '@resources/adapters/products/products.providers';
import { provideCartAdapterOutPutStub } from '@utils/stubs/cart';
import { provideProductsAdapterOutPutStub } from '@utils/stubs/products';
import { of } from 'rxjs';
import { HomeProductComponent } from './products.component';

describe('HomeProductComponent', () => {
    let component: HomeProductComponent
    let fixture: ComponentFixture<HomeProductComponent>;
    let cartService: ICartOutputPort;
    let productService: IproductOutputPort;

    const outputPorts = [
        provideProductsAdapterOutPutStub(),
        provideCartAdapterOutPutStub(),
    ]

    beforeEach(() => {
        TestBed.overrideComponent(HomeProductComponent, {
            set: {
                providers: [
                    ...outputPorts
                ]
            }
        }).configureTestingModule({
            providers: [
                provideCartInputAdapter(),
                provideProductsInputAdapter(),
                ...outputPorts
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(HomeProductComponent);
        component = fixture.componentInstance;
        cartService = TestBed.inject(CART_OUTPUT_PORT);
        productService = TestBed.inject(PRODUCT_OUTPUT_PORT);

        fixture.detectChanges()
    });


    it('should render products from ProductService', async () => {

        const observerSpy = subscribeSpyTo(component.products);

        observerSpy.unsubscribe();

        fixture.detectChanges();

        const elementList = fixture.debugElement.queryAll(By.css('li'));

        expect(observerSpy.getLastValue()?.products.length).toBe(2);
        expect(elementList.length).toBe(2)
    });

    it('should add product to cart', () => {

        const products = {
            products: [new Product(100, '1', 1, 10)], total: 10, limit: 10, skip: 0
        }

        jest.spyOn(productService, 'getProducts').mockReturnValueOnce(of(products))

        const button = fixture.debugElement.query(By.directive(AddToCartDirective));

        const componentNative: HTMLButtonElement = button.nativeElement;

        componentNative.click();

        fixture.detectChanges();

        const observerSpyCart = subscribeSpyTo(cartService.getPersistedCart());

        expect(observerSpyCart.getLastValue()?.cartList.length).toBe(1);

        observerSpyCart.unsubscribe();
    })


    it('should increment product amount in cart', () => {

        cartService.persistCart(new Cart([]));

        const products = {
            products: [new Product(100, '1', 1, 10)], total: 10, limit: 10, skip: 0
        }

        jest.spyOn(productService, 'getProducts').mockReturnValue(of(products))

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.directive(AddToCartDirective));
        const componentNative: HTMLButtonElement = button.nativeElement;

        componentNative.click();
        componentNative.click();

        fixture.detectChanges();

        const observerSpyCartProduct = subscribeSpyTo(cartService.getProductFromCart(products.products[0].id));

        expect(observerSpyCartProduct.getLastValue()?.amountOnCart).toBe(2);

        observerSpyCartProduct.unsubscribe();
    })

    it('should not add product on car when stock sold out', () => {

        cartService.persistCart(new Cart([]));

        const products = {
            products: [new Product(101, '1', 1, 1)], total: 10, limit: 10, skip: 0
        }

        jest.spyOn(productService, 'getProducts').mockReturnValueOnce(of(products))

        const button = fixture.debugElement.query(By.directive(AddToCartDirective));

        const componentNative: HTMLButtonElement = button.nativeElement;

        componentNative.click();
        componentNative.click();

        fixture.detectChanges();

        const observerSpyCartProduct = subscribeSpyTo(cartService.getProductFromCart(products.products[0].id));

        observerSpyCartProduct.unsubscribe();

        expect(observerSpyCartProduct.getLastValue()).toBeNull();
    })

    it('should load next page of products', async () => {

        const fakeProductList = new Array(20).fill({} as Product).map((_, index: number) => (new Product(
            index + 100,
            String(index + 100),
            index + 100,
            1)));

        let productList: ProductList = {
            products: fakeProductList.slice(0, 10),
            total: 20,
            limit: 10,
            skip: 0
        };

        jest.spyOn(productService, 'getProducts').mockReturnValue(of(productList));

        const observerSpy = subscribeSpyTo(component.products);

        expect(observerSpy.getLastValue()?.products.length).toBe(10)
        expect(observerSpy.getLastValue()?.skip).toBe(0);

        const productListNextPage = { products: fakeProductList.slice(10, 20), total: 20, limit: 10, skip: 10 };

        jest.spyOn(productService, 'getProducts').mockReturnValue(of(productListNextPage));

        const buttonNext = fixture.debugElement.query(By.css('.next'));

        const buttonNextElement: HTMLButtonElement = buttonNext.nativeElement

        buttonNextElement.click();

        fixture.detectChanges();

        const elementList = fixture.debugElement.queryAll(By.css('li'));
        
        expect(elementList.length).toBe(10)
        expect(observerSpy.getLastValue()?.skip).toBe(10);

        observerSpy.unsubscribe();
    });
    it('should load a previous page of products', async () => {

        const fakeProductList = new Array(20).fill({} as Product).map((_, index: number) => (new Product(
            index + 100,
            String(index + 100),
            index + 100,
            1
        )));

        let productList: ProductList = {
            products: fakeProductList.slice(10, 20),
            total: fakeProductList.length,
            limit: 10,
            skip: 10
        };

        jest.spyOn(productService, 'getProducts').mockReturnValue(of(productList));

        const observerSpy = subscribeSpyTo(component.products);

        fixture.detectChanges();

        const buttonNext = fixture.debugElement.query(By.css('.next'));
        const buttonNextElement: HTMLButtonElement = buttonNext.nativeElement
        const elementList = fixture.debugElement.queryAll(By.css('li'));

        buttonNextElement.click();

        fixture.detectChanges();

        expect(elementList.length).toBe(10)
        expect(observerSpy.getLastValue()?.skip).toBe(10);

        productList = { products: fakeProductList.slice(0, 10), total: fakeProductList.length, limit: 10, skip: 0 };
        jest.spyOn(productService, 'getProducts').mockReturnValue(of(productList));

        const buttonPrev = fixture.debugElement.query(By.css('.prev'));

        const buttonPrevElement: HTMLButtonElement = buttonPrev.nativeElement

        buttonPrevElement.click();

        expect(observerSpy.getLastValue()?.skip).toBe(0);
        expect(elementList.length).toBe(10)

        observerSpy.unsubscribe();
    });

    it('should handle empty product list', async () => {

        let productList: ProductList = {
            products: [],
            total: 0,
            limit: 10,
            skip: 0,
        };

        jest.spyOn(productService, 'getProducts').mockReturnValue(of(productList));

        fixture.detectChanges();
        await fixture.whenRenderingDone();

        const observerSpyProduct = subscribeSpyTo(component.products);

        expect(observerSpyProduct.getLastValue()?.products.length).toBe(0);

    })
});
