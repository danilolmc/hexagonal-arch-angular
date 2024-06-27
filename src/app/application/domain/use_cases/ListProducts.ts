import { IproductOutputPort } from "../../ports/products/output.port";


export class ListProductsService {

    private port: IproductOutputPort;

    constructor(private outputPort: IproductOutputPort) {
        this.port = this.outputPort;
    }

    getProducts(limit: number, skip: number) {
        return this.port.getProducts(limit, skip);
    }
}
