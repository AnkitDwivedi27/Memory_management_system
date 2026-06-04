# Memory Allocator Warrior

A React-based educational tool for visualizing memory management algorithms.

## What this project does

- Compares memory allocation strategies: First Fit, Best Fit, Worst Fit, and Next Fit
- Lets users add custom memory blocks and processes
- Displays allocation results and memory layout visualizations
- Includes a paging simulator with page allocation, translation, and table mapping
- Includes a FIFO page replacement simulator with step-by-step visualization

## Technology stack

- React
- Vite
- Tailwind CSS
- React Router
- shadcn/ui components

## Project structure

- `src/` - application source files
- `src/main.jsx` - app entry point
- `src/App.jsx` - main router and providers
- `src/pages/` - page screens
- `src/components/` - reusable UI and algorithm components
- `src/index.css` - global theme and color definitions

## Setup

```sh
# Install dependencies
npm install

# Run local development server
npm run dev
```

Then open the local URL shown in the terminal (for example `http://localhost:8081/`).

## Build

```sh
npm run build
```

## Notes

- The source is now JSX-based (`.jsx`) rather than TypeScript.
- The UI uses global CSS custom properties and Tailwind classes for theming.
- If you want to reset a clean state, remove `node_modules/` and reinstall dependencies.
