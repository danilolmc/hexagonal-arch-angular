export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export class Product {

  constructor(  
    private _id: number,
    private _title: string,
    private _price: number,
    private _stock: number,
    private _description?: string,
    private _thumbnail?: string,
  ) {}

  public isAvailable(): boolean {
    return this._stock !== undefined && this._stock > 0;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get price(): number {
    return this._price;
  }

  get description(): string | undefined {
    return this._description;
  }

  get stock(): number {
    return this._stock;
  }

  get thumbnail(): string | undefined {
    return this._thumbnail;
  }

  set id(id: number) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set thumbnail(thumbnail: string) {
    this._thumbnail = thumbnail;
  }


  set price(price: number) {
    if (this._price < 0) {
      throw new Error('Price cannot be negative');
    }
    this._price = price;
  }

  set description(description: string) {
    this._description = description;
  }

  set stock(stock: number) {
    if (stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this._stock = stock;
  }
}    