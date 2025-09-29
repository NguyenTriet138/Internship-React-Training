import { ProductData, Product, ProductFilter, SaveProductDataRequest } from 'types/product.types';
import { PaginatedResult } from 'types/pagination.types';
import { API_CONFIG, ENV } from '@config/env';
import { ImgBBResponse } from 'types/imageResponse.type';

export class ProductService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async requestImg(endpoint: string, body?: BodyInit): Promise<ImgBBResponse> {
    const uploadUrl = `${ENV.IMGBB_BASE_URL}?expiration=${ENV.IMGBB_EXPIRATION}&key=${ENV.IMGBB_API_KEY}`;
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {},
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private paginate<T>(items: T[], page: number, itemsPerPage: number): PaginatedResult<T> {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = items.slice(startIndex, endIndex);

    return {
      data,
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalItems,
        totalPages,
      },
    };
  }

  private filterProducts(products: Product[], filters: ProductFilter): Product[] {
    return products.filter(product => {
      if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      if (filters.status && filters.status !== 'All' && product.status !== filters.status) {
        return false;
      }
      if (filters.type && filters.type !== 'All' && product.type !== filters.type) {
        return false;
      }
      if (filters.brand && !product.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  async getAllProducts(page: number = 1, itemsPerPage: number = 10): Promise<PaginatedResult<Product>> {
    const data = await this.request<ProductData[]>('/products');
    const products = data.map(Product.fromJSON);
    return this.paginate(products, page, itemsPerPage);
  }

  async getFilteredProducts(filters: ProductFilter, page: number = 1, itemsPerPage: number = 10): Promise<PaginatedResult<Product>> {
    const data = await this.request<ProductData[]>('/products');
    const products = data.map(Product.fromJSON);
    const filteredProducts = this.filterProducts(products, filters);
    return this.paginate(filteredProducts, page, itemsPerPage);
  }

  async getProductById(id: string): Promise<Product> {
    const data = await this.request<ProductData>(`/products/${id}`);
    return Product.fromJSON(data);
  }

  async createProduct(productData: Omit<ProductData, 'id'>): Promise<Product> {
    const data = await this.request<ProductData>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    return Product.fromJSON(data);
  }

  async updateProduct(id: string, productData: SaveProductDataRequest): Promise<Product> {
    const data = await this.request<ProductData>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
    return Product.fromJSON(data);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async checkProductExists(name: string, excludeId?: string): Promise<boolean> {
    const data = await this.request<ProductData[]>('/products');
    return data.some(product =>
      product.name.toLowerCase() === name.toLowerCase() &&
      product.id !== excludeId
    );
  }

  async uploadImage(base64Img: string): Promise<string> {
    const form = new FormData();
    form.append('image', base64Img.split(',')[1]);
    const response = await this.requestImg(ENV.IMGBB_BASE_URL, form);
    return response.data.url;
  }
}
