import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  formatCurrency(amount: number, currencyCode = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  calculateSubtotal(price: number, quantity: number): number {
    return Math.round(price * quantity * 100) / 100;
  }

  calculateTotal(items: Array<{ price: number; quantity: number }>): number {
    return (
      Math.round(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
      ) / 100
    );
  }

  pluralise(count: number, singular: string, plural = `${singular}s`): string {
    return count === 1 ? singular : plural;
  }
}
