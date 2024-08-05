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

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
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
