import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  of,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { PRODUCTS } from '../data/products.data';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // ─── Task 8: error state stream ───────────────────────────────────────────
  readonly loadError$ = new BehaviorSubject<string | null>(null);

  // ─── Task 2: cold Observable — emits once with the full product array ──────
  private readonly allProducts$: Observable<Product[]> = of(PRODUCTS);

  // ─── Tasks 2, 3, 8: add delay (simulates async load), tap for logging,
  //     catchError so a thrown error never crashes the stream ─────────────────
  readonly products$: Observable<Product[]> = this.allProducts$.pipe(
    delay(300),
    tap((products) =>
      console.log('[ProductService] Loaded', products.length, 'products')
    ),
    tap(() => {
      // ── Task 8 demo: uncomment the line below to trigger the error path ──
      // throw new Error('Simulated server error');
    }),
    catchError((err) => {
      console.error('[ProductService] Error loading products:', err);
      this.loadError$.next(
        'Could not load desserts. Please try again later.'
      );
      return of([]); // graceful fallback — empty list, app keeps running
    })
  );

  // ─── Task 4: plain Subject — no default value, only emits on user typing ───
  // (Use BehaviorSubject when you need an initial value; Subject when you don't)
  readonly searchTerm$ = new Subject<string>();

  // ─── Task 2: BehaviorSubject — holds the "latest" value so new subscribers
  //     immediately receive the current category without waiting for an event ──
  readonly selectedCategory$ = new BehaviorSubject<string>('');

  // ─── Task 4: debounce + deduplicate the raw keystrokes ───────────────────
  private readonly processedSearch$: Observable<string> =
    this.searchTerm$.pipe(
      debounceTime(300), // wait 300 ms after the last keystroke before continuing
      distinctUntilChanged(), // skip if the value hasn't changed
      tap((term) => console.log('[ProductService] Searching for:', `"${term}"`))
    );

  // ─── Tasks 3, 5: combine all three streams into one filtered list ─────────
  // combineLatest re-emits whenever ANY of the three sources emits a new value.
  // startWith('') seeds processedSearch$ so combineLatest can emit immediately
  // on first load (plain Subject has no initial value).
  readonly filteredProducts$: Observable<Product[]> = combineLatest([
    this.products$,
    this.processedSearch$.pipe(startWith('')),
    this.selectedCategory$,
  ]).pipe(
    // ── Task 3: switchMap — cancels the previous inner Observable when a new
    //    outer value arrives. Identical pattern to real HttpClient search calls.
    switchMap(([products, term, category]) =>
      of(products).pipe(
        // ── Task 3: map transforms the array; filter reduces it ──────────
        map((list) =>
          list
            .filter((p) => category === '' || p.category === category)
            .filter(
              (p) =>
                term === '' ||
                p.name.toLowerCase().includes(term.toLowerCase()) ||
                p.category.toLowerCase().includes(term.toLowerCase())
            )
        )
      )
    ),
    tap((results) =>
      console.log('[ProductService] Filtered to', results.length, 'products')
    )
  );

  // ─── Task 3: take(1) — completes after the first emission, one-shot ───────
  getCategories$(): Observable<string[]> {
    return this.products$.pipe(
      take(1),
      map((products) => ['', ...new Set(products.map((p) => p.category))])
    );
  }

  // ─── Task 8: call from browser DevTools to test the error banner ──────────
  // Open DevTools console and run: window['ng'].getComponent(document.querySelector('app-root'))
  simulateError(): void {
    this.loadError$.next(
      'Simulated network error. Showing cached products.'
    );
  }
}
