import { CurrencyPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartService = inject(CartService);
  orderConfirmed = output<void>();

  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }

  confirm(): void {
    this.orderConfirmed.emit();
  }
}
