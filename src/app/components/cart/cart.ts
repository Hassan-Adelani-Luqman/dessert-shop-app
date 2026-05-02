import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartService = inject(CartService);
  orderConfirmed = output<void>();

  // ─── Task 7: toSignal() bridges Observable → Signal for the template ───────
  // toSignal() internally subscribes and calls takeUntilDestroyed() so the
  // subscription is cleaned up automatically when this component is destroyed.
  // initialValue prevents undefined before the BehaviorSubject emits.
  items = toSignal(this.cartService.items$, {
    initialValue: [] as CartItem[],
  });
  totalItems = toSignal(this.cartService.totalItems$, { initialValue: 0 });
  orderTotal = toSignal(this.cartService.orderTotal$, { initialValue: 0 });

  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }

  confirm(): void {
    this.orderConfirmed.emit();
  }
}
