import { Injectable, computed, signal } from '@angular/core';
import { PRODUCTS } from '../data/products.data';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>(PRODUCTS);

  products = this._products.asReadonly();

  categories = computed(() => [...new Set(this._products().map((p) => p.category))]);

  getById(id: number): Product | undefined {
    return this._products().find((p) => p.id === id);
  }

  getByCategory(category: string): Product[] {
    return this._products().filter((p) => p.category === category);
  }

  sortByPrice(direction: 'asc' | 'desc' = 'asc'): Product[] {
    return [...this._products()].sort((a, b) =>
      direction === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  sortByName(): Product[] {
    return [...this._products()].sort((a, b) => a.name.localeCompare(b.name));
  }
}
