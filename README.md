# Dessert Shop App

An Angular application that demonstrates core Angular concepts through a fully functional dessert e-commerce experience. Built across two progressive lab modules.

**Live Demo:** https://beautiful-palmier-5d5c68.netlify.app/

---

## About the Project

The Dessert Shop App lets users browse a catalogue of 9 desserts, add items to a cart, adjust quantities, and confirm their order through a modal.

---

## Features

- Browse 9 desserts in a responsive 3-column grid
- Add items to cart with a single click
- Increment / decrement quantities directly on each product card
- Live cart sidebar with running totals
- Order confirmation modal with a full order summary
- Carbon-neutral delivery badge
- Fully responsive — mobile, tablet, and desktop layouts

---

## Tech Stack

| Tool | Version |
|---|---|
| Angular | 21 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Node.js | 18+ |

---

## Project Structure

```
src/
  app/
    models/
      product.model.ts          ← Product & CartItem interfaces
    data/
      products.data.ts          ← Hardcoded catalogue of 9 desserts
    services/
      cart.service.ts           ← Cart state (signals-based)
      product.service.ts        ← Product data & query operations
      utility.service.ts        ← Formatting & calculation helpers
      logging.service.ts        ← Action tracking across the app
    components/
      product-card/             ← Dessert card + quantity controls
      product-list/             ← Responsive 3-column grid
      cart/                     ← Cart sidebar / bottom panel
      order-confirmation/       ← Confirmation modal
    app.ts                      ← Root component
    app.html                    ← Layout shell
  assets/
    desserts/                   ← 9 dessert images
    icons/                      ← SVG icons
  styles.css                    ← Tailwind entry + theme tokens
```

---

## Angular Concepts Demonstrated

| Concept | Where |
|---|---|
| Standalone components | All components (`standalone: true`) |
| `signal()` & `computed()` | `CartService`, `ProductService`, `LoggingService` |
| `inject()` | All services injected via `inject()` |
| `input.required<T>()` | `ProductCardComponent`, `OrderConfirmationComponent` |
| `output<T>()` | `CartComponent`, `OrderConfirmationComponent` |
| `@for` / `@if` control flow | All list and conditional rendering |
| `CurrencyPipe` | Cart and order confirmation |
| `@Injectable({ providedIn: 'root' })` | All services — root-scoped singletons |
| Dependency Injection | Services injected into components and other services |
| Separation of concerns | Business logic in services, presentation in components |

---

## Services

### `CartService`
Manages all cart state using Angular signals.

| Member | Type | Description |
|---|---|---|
| `items` | `Signal<CartItem[]>` | Current cart items |
| `totalItems` | `computed` | Sum of all quantities |
| `orderTotal` | `computed` | Total price (delegated to `UtilityService`) |
| `addItem(product)` | method | Add or increment an item |
| `removeItem(id)` | method | Remove an item |
| `updateQuantity(id, qty)` | method | Set a specific quantity |
| `getQuantity(id)` | method | Read an item's current quantity |
| `clearCart()` | method | Reset cart after order |

### `ProductService`
Single source of truth for product data.

| Member | Type | Description |
|---|---|---|
| `products` | `Signal<Product[]>` | All 9 products (read-only) |
| `categories` | `computed` | Unique category list |
| `getById(id)` | method | Find a product by ID |
| `getByCategory(cat)` | method | Filter products by category |
| `sortByPrice(dir)` | method | Sort ascending or descending by price |
| `sortByName()` | method | Sort alphabetically by name |

### `UtilityService`
Stateless helpers for formatting and maths used across the app.

| Method | Description |
|---|---|
| `formatCurrency(amount)` | Format a number as a USD string |
| `calculateSubtotal(price, qty)` | Price × quantity, rounded to 2 dp |
| `calculateTotal(items)` | Sum all line totals, rounded to 2 dp |
| `pluralise(count, singular)` | Return the correct singular/plural form |

### `LoggingService`
Tracks user actions across the app via Angular signals.

| Member | Type | Description |
|---|---|---|
| `logs` | `Signal<LogEntry[]>` | All recorded log entries |
| `recentActions` | `computed` | Last 10 user actions |
| `actionCount` | `computed` | Total number of logged actions |
| `action(name, details?)` | method | Log a user action |
| `log(name, details?, level?)` | method | Log at a specified level |
| `error(name, details?)` | method | Log an error |
| `clearLogs()` | method | Reset the log |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- Angular CLI — `npm install -g @angular/cli`

### Installation

```bash
git clone https://github.com/Hassan-Adelani-luqman/dessert-shop-app.git
cd dessert-shop-app
npm install
```

### Development Server

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Production Build

```bash
ng build
```

Output is placed in `dist/dessert-shop-app/browser/`.

---

## Deployment

The app is deployed on **Netlify**.

- Build command: `ng build`
- Publish directory: `dist/dessert-shop-app/browser`
- Auto-deploys on every push to the `main` branch.

---

## Lab Modules

### Module 1 — Angular Fundamentals
Built the complete UI and cart functionality using standalone components, signals, `@for`/`@if` control flow, and component communication via inputs and outputs.

### Module 2 — Services & Dependency Injection
Refactored shared logic into injectable services:
- Moved product data management into `ProductService`
- Extracted formatting and calculation helpers into `UtilityService`
- Added cross-component action tracking with `LoggingService`
- Demonstrated `providedIn: 'root'` singleton scope
- Showed how services can be injected into other services (`CartService` → `UtilityService` + `LoggingService`)
- Achieved full separation of concerns between components and business logic

---

## Running Tests

```bash
ng test
```

---

## Author

**Hassan Adelani Luqman** — h.luqman@alustudent.com
