# Dessert Shop App

An Angular application that demonstrates core Angular concepts through a fully functional dessert e-commerce experience.

**Live Demo:** _https://fantastic-lollipop-d3dcd7.netlify.app/_

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

## Running Tests

```bash
ng test
```

---
