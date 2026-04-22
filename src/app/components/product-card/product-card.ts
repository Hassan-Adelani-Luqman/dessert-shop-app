import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
  private cartService = inject(CartService);

  qty = computed(() => this.cartService.getQuantity(this.product().id));

  add(): void {
    this.cartService.addItem(this.product());
  }

  increment(): void {
    this.cartService.updateQuantity(this.product().id, this.qty() + 1);
  }

  decrement(): void {
    this.cartService.updateQuantity(this.product().id, this.qty() - 1);
  }
}
