import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  // ─── Existing signals (kept for ProductCardComponent's computed qty) ───────
  items = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  orderTotal = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  // ─── Task 6: BehaviorSubject mirrors the signal for RxJS consumers ─────────
  // BehaviorSubject holds the "latest" value — any new subscriber immediately
  // receives the current cart contents without waiting for the next mutation.
  readonly items$ = new BehaviorSubject<CartItem[]>([]);

  // Derived Observable streams using the map operator
  readonly totalItems$ = this.items$.pipe(
    map((items) => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  readonly orderTotal$ = this.items$.pipe(
    map((items) =>
      items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    )
  );

  // ─── Mutation methods: update signal first, then mirror to BehaviorSubject ──
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
    this.items$.next(this.items()); // mirror to BehaviorSubject → triggers Observable consumers
  }

  removeItem(productId: number): void {
    this.items.set(this.items().filter((i) => i.product.id !== productId));
    this.items$.next(this.items());
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
    this.items$.next(this.items());
  }

  getQuantity(productId: number): number {
    return this.items().find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  clearCart(): void {
    this.items.set([]);
    this.items$.next([]);
  }
}
