import { Product } from './product';

export interface CartProduct {
    product: Product;
    amountOnCart: number;
}

export class Cart {

    constructor(public cartList: CartProduct[], private _cartSubTotal = 0) { }

    get subtotal() {
        return this._cartSubTotal;
    }

    set subtotal(total: number) {
        this._cartSubTotal = total;
    }


    empty() {
        this.cartList = [];
    }

    removeProduct(productId: number) {
        const targetProduct = this.cartList.find((item) => item.product.id === productId);

        if (!targetProduct) return null;

        this.cartList = this.cartList.filter(item => item.product.id !== targetProduct.product.id);

        this._cartSubTotal = this._cartSubTotal - (targetProduct.amountOnCart * Number(targetProduct.product.price));

        return targetProduct;
    }

    addToCart(productToAddOnCart: Product) {

        const productOnCart = this.cartList.find(item => item.product.id == productToAddOnCart.id) ?? null;

        const hasStock = productToAddOnCart.isAvailable();

        if (!productToAddOnCart || !hasStock) return null;

        let product: CartProduct | null = null

        if (productOnCart) {
            productOnCart.amountOnCart = productOnCart.amountOnCart + 1;
            product = productOnCart;
        }

        if (!productOnCart) {
            const newCartProduct: CartProduct = { product: productToAddOnCart, amountOnCart: 1 }
            this.cartList.push(newCartProduct);
            product = newCartProduct;
        }

        this.subtotal = this.calcSubtotal();

        return product;
    }

    private calcSubtotal() {
        const total = this.cartList.reduce((acc, curr) => {
            return acc + (curr.amountOnCart * curr.product.price)
        }, this._cartSubTotal)

        return total;
    }


    getCartProduct(productId: number) {
        const targetProduct = this.cartList.find((item) => item.product.id === productId);

        if (!targetProduct) return null;

        return targetProduct;
    }
}