import { Component, inject, signal } from '@angular/core';
import { PRODUCTS } from './data/products.data';
import { CartService } from './services/cart.service';
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
  products = PRODUCTS;
  cartService = inject(CartService);
  showModal = signal(false);

  onOrderConfirmed(): void {
    this.showModal.set(true);
  }

  onStartNewOrder(): void {
    this.cartService.clearCart();
    this.showModal.set(false);
  }
}
