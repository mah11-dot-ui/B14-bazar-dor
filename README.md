# বাজার দর | BazarDor

প্রয়োজনীয় নিত্যপণ্যের দাম এক নজরে দেখুন। BazarDor-এ পণ্যের বর্তমান দাম, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য সহজে খুঁজে পাওয়া যায়।

## Technologies

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4 and [DaisyUI](https://daisyui.com/)
- [Better Auth](https://www.better-auth.com/) for authentication
- [MongoDB](https://www.mongodb.com/) for authentication data
- `react-hot-toast` for user feedback
- BazarDor API for category and product data

## Key Features

1. **Daily price overview** — browse all products and see which prices have increased or decreased.
2. **Category browsing** — select a category to view its products and current prices.
3. **Product details** — view price comparisons and market-by-market price information; sign-in is required.
4. **Account and profile management** — register or sign in with email and password, use configured Google/GitHub sign-in, and update your profile name.
5. **Responsive experience** — mobile-friendly layouts, loading skeletons, Bengali 404 page, and toast notifications.

## Getting Started

### Requirements

- Node.js and npm
- A MongoDB connection string
- Better Auth URL and secret

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and configure:

   ```env
   MONGODB_URI=
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   ```

   Google and GitHub credentials are optional. Configure them to enable their respective social sign-in buttons.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Production Link

