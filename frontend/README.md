# LuxuryStay HMS — React (JSX) eProject

Plain React + Vite + React Router DOM. No TypeScript, no framework lock-in.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Modules

- `/` Dashboard
- `/rooms` Rooms inventory
- `/reservations` Bookings
- `/checkin` Arrivals / departures
- `/guests` Guest profiles
- `/housekeeping` Cleaning & maintenance board
- `/billing` Invoices
- `/reports` Analytics
- `/staff` Staff & roles
- `/feedback` Reviews
- `/settings` Property settings

All data is in-memory (`src/lib/store.js`) using `useSyncExternalStore` —
restart the page to reset.
