import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.html',
})
export class SearchBarComponent {
  private productService = inject(ProductService);

  // ─── Task 7: toSignal() subscribes to the one-shot getCategories$() stream.
  // takeUntilDestroyed() is managed internally — no manual cleanup needed.
  categories = toSignal(this.productService.getCategories$(), {
    initialValue: [] as string[],
  });

  // ─── Task 4: push keystroke value into the Subject ────────────────────────
  // The Subject has no value until the user types — debounce + distinctUntilChanged
  // are applied downstream in ProductService.processedSearch$.
  onSearch(term: string): void {
    this.productService.searchTerm$.next(term);
  }

  // ─── Task 2: push selected category into the BehaviorSubject ─────────────
  // BehaviorSubject immediately broadcasts the new value to all subscribers,
  // causing filteredProducts$ to re-emit with the new category filter applied.
  onCategoryChange(category: string): void {
    this.productService.selectedCategory$.next(category);
  }
}
