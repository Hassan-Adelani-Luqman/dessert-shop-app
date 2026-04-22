import { Injectable, computed, inject, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { LoggingService } from './logging.service';
import { UtilityService } from './utility.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private logging = inject(LoggingService);
  private utility = inject(UtilityService);

  items = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  orderTotal = computed(() =>
    this.utility.calculateTotal(
      this.items().map((i) => ({ price: i.product.price, quantity: i.quantity }))
    )
  );

  addItem(product: Product): void {
    const current = this.items();
    const existing = current.find((i) => i.product.id === product.id);
    if (existing) {
      this.items.set(
        current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
    this.logging.action('add_to_cart', { productId: product.id, name: product.name });
  }

  removeItem(productId: number): void {
    const item = this.items().find((i) => i.product.id === productId);
    this.items.set(this.items().filter((i) => i.product.id !== productId));
    this.logging.action('remove_from_cart', { productId, name: item?.product.name });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.set(
      this.items().map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
    this.logging.action('update_quantity', { productId, quantity });
  }

  getQuantity(productId: number): number {
    return this.items().find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  clearCart(): void {
    this.logging.action('clear_cart', { itemCount: this.items().length });
    this.items.set([]);
  }
}
