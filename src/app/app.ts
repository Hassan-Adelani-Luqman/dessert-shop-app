import { Component, inject, signal } from '@angular/core';
import { CartService } from './services/cart.service';
import { LoggingService } from './services/logging.service';
import { CartComponent } from './components/cart/cart';
import { ProductListComponent } from './components/product-list/product-list';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent, OrderConfirmationComponent],
  templateUrl: './app.html',
})
export class App {
  cartService = inject(CartService);
  private logging = inject(LoggingService);
  showModal = signal(false);

  onOrderConfirmed(): void {
    this.showModal.set(true);
    this.logging.action('order_confirmed', {
      total: this.cartService.orderTotal(),
      itemCount: this.cartService.totalItems(),
    });
  }

  onStartNewOrder(): void {
    this.logging.action('start_new_order');
    this.cartService.clearCart();
    this.showModal.set(false);
  }
}
