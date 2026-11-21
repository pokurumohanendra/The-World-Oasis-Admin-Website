# The Wild Oasis

A responsive hotel-management dashboard for staff. Manage cabins and bookings, check guests in and out, review daily activity, and monitor sales and stay-duration trends.

## Features

- Authentication, employee signup, logout, and profile updates
- Cabin creation, editing, deletion, and image uploads
- Booking filtering, sorting, pagination, details, and deletion
- Guest check-in, breakfast purchase, and checkout
- Dashboard statistics, sales charts, and stay-duration charts
- Hotel settings and persistent light/dark mode
- Responsive layouts for desktop, tablet, and mobile devices

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React, Vite |
| Backend | Supabase database, authentication, and storage |
| Server state | TanStack Query |
| Forms | React Hook Form |
| Styling | styled-components |
| Routing and feedback | React Router, react-hot-toast |
| Charts and utilities | Recharts, date-fns, react-icons |

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add the Supabase project URL and anonymous key.
4. Start the development server with `npm run dev`.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```

Never put a Supabase service-role key in the frontend.

## Supabase requirements

The application expects `Cabins`, `bookings`, `guests`, and `settings` tables. The `Cabins` table name is case-sensitive in the existing cabin service.

Create these public Storage buckets with the exact case-sensitive names:

- `Cabin_images`
- `avatars`

Configure Row Level Security policies so authenticated employees can access the required records and storage objects.

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the source code |

## Project structure

```text
src/
├── context/    shared application context
├── features/   authentication, bookings, cabins, check-in/out, dashboard, settings
├── hooks/      reusable hooks
├── pages/      route-level pages
├── services/   Supabase client and API functions
├── styles/     global styling and theme variables
├── ui/         shared interface components
└── utils/      constants and utility functions
```

## Production hosting

Production hosting must redirect unknown routes to `index.html` so React Router URLs such as `/bookings/:bookingId` work after a browser refresh.

## About

Built as a learning project to practise feature-based architecture, server-state caching with TanStack Query, responsive interface design, and full CRUD workflows with Supabase.

## Author

[Pokuru Mohanendra](https://github.com/pokurumohanendra) · [LinkedIn](https://www.linkedin.com/in/pokuru-mohanendra/)
