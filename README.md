# The Wild Oasis

A hotel-management dashboard for staff. Manage cabins and bookings, check guests in and out, review the day's activity, and see sales and stay-duration charts.

## Features

- **Authentication:** sign in, sign up, update your profile, avatar and password
- **Cabins:** create, edit and delete cabins with validated forms, with images stored in Supabase Storage
- **Bookings:** filterable and sortable table, booking detail view, check-in and check-out
- **Today's activity:** guests arriving and leaving
- **Dashboard:** key figures, a sales chart and a stay-duration chart, with a last 7, 30 or 90 days filter
- **Settings:** application settings form

## Tech stack

| Area | Tools |
|------|-------|
| Framework | React, Vite |
| Backend | Supabase (database, authentication, and storage for cabin images) |
| Server state | TanStack Query |
| Forms | React Hook Form |
| Styling | styled-components |
| Routing and feedback | React Router, react-hot-toast |
| Utilities | date-fns, react-icons |

## Getting started

You need Node.js (LTS) and your own [Supabase](https://supabase.com) project with `cabins`, `bookings`, `guests` and `settings` tables.

```bash
npm install
npm run dev
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Run the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the source |

### Configuration

The Supabase project URL and public (anon) key are set in `src/services/supabase.js`. Replace them with your own project's values. The anon key is designed to be public, but moving both values into environment variables is a good next step.

## Project structure

```
src/
├── features/   cabins, bookings, check-in-out, dashboard, authentication, settings
├── pages/      route-level pages
├── services/   Supabase client and API functions
├── ui/         shared interface components
├── hooks/      reusable hooks
└── styles/     global styles
```

## About

Built as a learning project to practise a feature-based folder structure, server-state caching with React Query, and a full CRUD application on Supabase.

## Author

[Pokuru Mohanendra](https://github.com/pokurumohanendra) · [LinkedIn](https://www.linkedin.com/in/pokuru-mohanendra/)
