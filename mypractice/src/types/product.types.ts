export enum ProductStatus {
  Available = "Available",
  SoldOut = "Sold out",
}

export enum ProductType {
  Bravo = "Bravo",
  Alfa = "Alfa",
  Gold = "Gold"
}

export interface ProductData {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status: ProductStatus;
  type: ProductType;
  brand: string;
  productImage: string;
  brandImage: string;
}

export interface SaveProductDataRequest {
  name: string;
  quantity: number;
  price: number;
  status: ProductStatus;
  type: ProductType;
  brand: string;
  productImage: string;
  brandImage: string;
}

export interface ProductFilter {
  name?: string;
  status?: ProductStatus | 'All';
  type?: ProductType | 'All';
  brand?: string;
}

export class Product {
  public id: string;
  public name: string;
  public quantity: number;
  public price: number;
  public status: ProductStatus;
  public type: ProductType | string;
  public brand: string;
  public productImage: string;
  public brandImage: string;

  constructor(props: ProductData) {
    this.id = props.id;
    this.name = props.name;
    this.quantity = props.quantity;
    this.price = props.price;
    this.status = props.status;
    this.type = props.type;
    this.brand = props.brand;
    this.productImage = props.productImage;
    this.brandImage = props.brandImage;
  }

  isAvailable(): boolean {
    return this.status === ProductStatus.Available;
  }

  isInStock(): boolean {
    return this.quantity > 0;
  }

  formatPrice(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }

  static fromJSON(data: ProductData): Product {
    return new Product({
      id: data.id,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      status: data.status === "Available" ? ProductStatus.Available : ProductStatus.SoldOut,
      type: data.type,
      brand: data.brand,
      productImage: data.productImage,
      brandImage: data.brandImage
    });
  }
}
