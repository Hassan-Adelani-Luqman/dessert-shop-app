import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card';
import { SearchBarComponent } from '../search-bar/search-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, SearchBarComponent],
  templateUrl: './product-list.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);

  // ─── Tasks 5, 7: toSignal() converts filteredProducts$ Observable → Signal ─
  // filteredProducts$ is driven by combineLatest([products$, search$, category$]).
  // Whenever any source emits, this signal updates and the @for re-renders.
  // initialValue shows the full list before the 300ms delay resolves.
  products = toSignal(this.productService.filteredProducts$, {
    initialValue: [] as Product[],
  });

  // ─── Task 8: error state from the BehaviorSubject in ProductService ────────
  loadError = toSignal(this.productService.loadError$, { initialValue: null });

  // ─── Task 7: commented example of what toSignal() does internally ─────────
  // If you needed to subscribe manually you would write:
  //   this.productService.filteredProducts$
  //     .pipe(takeUntilDestroyed())   ← cleans up when component is destroyed
  //     .subscribe(products => { ... });
  // toSignal() handles this automatically — no ngOnDestroy needed.
}
