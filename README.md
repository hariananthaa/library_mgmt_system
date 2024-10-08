# Library Management System(Frontend)

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
  - Member: Can view books and manage their own transactions and search a book by genre.

- **Access Control**:

  - Certain routes and actions are restricted based on user roles.
  - UI elements dynamically adapt to show only permitted actions for each role.

- **JWT Authentication**:

  - Uses JSON Web Tokens for secure authentication.
  - Tokens are stored in HTTP-only secure cookies, enhancing security against XSS attacks.
  - Automatic token refresh mechanism to maintain user sessions.
  - Token expiration time: **10 Minutes**

- **Protected Routes**:

  - Server-side and client-side route protection to prevent unauthorized access.

- **Secure Cookie Usage**:
  - JWT stored in HTTP-only cookies to prevent client-side access.
  - Secure flag ensures the cookie is only transmitted over HTTPS.
  - SameSite attribute set to prevent CSRF attacks.

## Credentials

Admin Credential:

- email: admin@zit.com
- password: test@123
- You can add members via this admin credential.

## Application Screenshots

Below are some screenshots showcasing key features of our Library Management System:

![login](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/1_login.jpg?raw=true)
![admin_dashboard](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/2_admin_dashboard.jpg?raw=true)
![books_page](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/3_books_page.jpg?raw=true)
![members_page](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/4_members_page.jpg?raw=true)
![edit_book](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/5_admin_edit_book.jpg?raw=true)
![add_member](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/7_add_member.jpg?raw=true)
![admin_history](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/8_admin%20History.jpg?raw=true)
![member_dashboard](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/6_member_dashboard.jpg?raw=true)
![request_book](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/9_request_book.jpg?raw=true)
![book_approval](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/10_book_approval.jpg?raw=true)
![book_returned](https://github.com/hariananthaa/library_mgmt_system/blob/main/screenshots/11_return_book.jpg?raw=true)

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

## Database Structure

[https://dbdiagram.io/d/library_mgmt_system-66b9968c8b4bb5230ed5d0c0](https://dbdiagram.io/d/library_mgmt_system-66b9968c8b4bb5230ed5d0c0)

## Deployment

This frontend application is hosted on Vercel, a cloud platform for static sites and Serverless Functions.

### Important Note on Inactivity

This backend spring boot application is hosted on Render, due to the nature of Render's free tier hosting:

[https://library-mgmt-backend-latest.onrender.com/swagger-ui](https://library-mgmt-backend-latest.onrender.com/swagger-ui)

- The application may become inactive after periods of no usage.
- The first request after an inactive period may take longer to load (usually 5 - 10 minutes) as the server spins up.
- Subsequent requests will be faster once the server is active.

If you experience a delay when first accessing the application, please be patient. This is normal behavior for applications hosted on Vercel's free tier that haven't been accessed recently.

### Live Demo

You can access the live version of this application at: https://library-mgmt-system-beta.vercel.app

Admin Credential:

- email: admin@zit.com
- password: test@123
- You can add members via this admin credential.

Please note that if you encounter any issues or the application seems unresponsive, you can try refreshing the page after a short wait. If problems persist, please reach out for support.

- Email: khariharan561@gmail.com

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Thank you to the open-source community for providing various libraries and tools that made this project possible.
