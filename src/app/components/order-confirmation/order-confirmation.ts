import { CurrencyPipe } from '@angular/common';
import { Component, input, output, Input} from '@angular/core';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmationComponent {
  items = input.required<CartItem[]>();
  total = input.required<number>();
  startNewOrder = output<void>();

  onStartNewOrder(): void {
    this.startNewOrder.emit();
  }
}
