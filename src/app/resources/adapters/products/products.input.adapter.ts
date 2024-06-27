import { Injectable, inject } from "@angular/core";
import { ListProductsService } from "@application/domain/use_cases/ListProducts";
import { IproductInputPort } from "@application/ports/products/input.port";
import { PRODUCT_OUTPUT_PORT } from "@application/ports/products/output.port";
import { BehaviorSubject, switchMap, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsInputAdapter implements IproductInputPort {

    private productOutPort = inject(PRODUCT_OUTPUT_PORT);
    private productApplication = new ListProductsService(this.productOutPort);

    private skipList = new BehaviorSubject(0)
    private pageSize = 10;
    private totalProducts = 0;

    getProducts() {
        return this.skipList.pipe(
            switchMap(page => this.productApplication.getProducts(this.pageSize, page).pipe(tap(products => { this.totalProducts = products?.total ?? 0 })))
        )
    }

    nextPage() {
        if (this.skipList.value > this.totalProducts) return;
        this.skipList.next(this.skipList.value + this.pageSize);
    }

    prevPage() {
        if (this.skipList.value <= 0) return;
        this.skipList.next(this.skipList.value - this.pageSize);
    }
}