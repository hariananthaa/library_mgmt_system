# Library Management System

A modern library management system built with Next.js, leveraging the latest features like Server Actions and the App Router.

## Technologies Used

- Next.js 14.2.5
- React 18
- TypeScript
- Tailwind CSS
- Zustand (for state management)
- React Hook Form (for form handling)
- Yup & Zod (for schema validation)
- Axios (for API requests)
- React Toastify (for notifications)

## Features

- **Book Management**: Add, update, and delete books. View all books and search by genre or query.
- **Member Management**: Add, update, and delete members. Manage member information and roles.
- **Transaction Management**: Track and manage book transactions, including issuing, returning, and canceling transactions.
- **Dashboard**: View counts and statistics related to books and members.
- **Authentication**: Secure access with role-based authentication and authorization.

## Authentication and Authorization

This application implements a robust role-based authorization system to ensure secure access to various features:

- **User Roles**:

  - Admin: Can manage books, members, and transactions.
  - Member: Can view books and manage their own transactions.

- **Access Control**:

  - Certain routes and actions are restricted based on user roles.
  - UI elements dynamically adapt to show only permitted actions for each role.

- **JWT Authentication**:

  - Uses JSON Web Tokens for secure authentication.
  - Tokens are stored in HTTP-only secure cookies, enhancing security against XSS attacks.
  - Automatic token refresh mechanism to maintain user sessions.

- **Protected Routes**:

  - Server-side and client-side route protection to prevent unauthorized access.

- **Secure Cookie Usage**:
  - JWT stored in HTTP-only cookies to prevent client-side access.
  - Secure flag ensures the cookie is only transmitted over HTTPS.
  - SameSite attribute set to prevent CSRF attacks.

## Application Screenshots

Below are some screenshots showcasing key features of our Library Management System:

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hariananthaa/library_mgmt_system
```

2. Navigate to the project directory:

```bash
cd library_mgmt_system
```

3. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

### Running the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
```

or

```bash
yarn build
```

### Running the Production Server

```bash
npm run start
```

or

```bash
yarn start
```

## Deployment

This application is hosted on Vercel, a cloud platform for static sites and Serverless Functions.

### Important Note on Inactivity

Due to the nature of Vercel's free tier hosting:

- The application may become inactive after periods of no usage.
- The first request after an inactive period may take longer to load (usually 10-20 seconds) as the server spins up.
- Subsequent requests will be faster once the server is active.

If you experience a delay when first accessing the application, please be patient. This is normal behavior for applications hosted on Vercel's free tier that haven't been accessed recently.

### Live Demo

You can access the live version of this application at: https://library-mgmt-system-beta.vercel.app

Please note that if you encounter any issues or the application seems unresponsive, you can try refreshing the page after a short wait. If problems persist, please reach out for support.

- Email: support@yourlibrarysystem.com

## Project Structure

```bash
library_mgmt_system/
├── app/
│ ├── (routes)/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── public/
├── styles/
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

- `app/(routes)`: Contains all route components and layouts using the App Router
- `app/components/`: Reusable React components
- `lib/`: Utility functions and shared logic
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configurations
