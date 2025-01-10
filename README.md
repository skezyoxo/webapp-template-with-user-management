# Next.js Web Application Template with User Management

This is a modern web application template built with Next.js, featuring user management and database integration. It includes:

- [Next.js](https://nextjs.org/) 14 with App Router
- [NextAuth.js](https://next-auth.js.org/) v4 for Authentication
- [Prisma](https://www.prisma.io/) for database ORM
- PostgreSQL support (with flexible hosting options)
- Role-Based Access Control (RBAC)
- Modern UI with Tailwind CSS

## Features

- Modern Next.js 14 with App Router
- Authentication with NextAuth.js v4
  - GitHub OAuth integration
  - Support for multiple providers
  - Session management
  - Account linking
- Role-Based Access Control (RBAC)
  - Flexible role management
  - Granular permissions
  - Resource-based access control
- Database integration with Prisma ORM
- Flexible PostgreSQL hosting options
- Responsive UI with Tailwind CSS
- Dark mode support
- Comprehensive TypeScript support
  - Full type safety
  - Generated Prisma types
  - Auth session types
  - Role-based operation types

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js installed (v18 or later)
- Access to a PostgreSQL database (self-hosted or cloud provider)
- Git for version control
- GitHub OAuth credentials (if using GitHub authentication)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Database Setup:
   You'll need a PostgreSQL database. Here are some options:

   #### Option 1: Using Neon (Serverless PostgreSQL)
   - Create a project at [Neon](https://neon.tech)
   - Copy your connection string
   
   #### Option 2: AWS RDS
   - Set up a PostgreSQL instance on RDS
   - Use the provided endpoint and credentials
   
   #### Option 3: Self-hosted PostgreSQL
   - Install PostgreSQL on your server
   - Configure access credentials

4. Environment Setup:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
     
     # NextAuth.js Configuration
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret-key # Generate one with: openssl rand -base64 32
     
     # GitHub OAuth
     GITHUB_ID=your-github-client-id
     GITHUB_SECRET=your-github-client-secret
     ```

5. Initialize the database:
   ```bash
   npx prisma generate   # Generate Prisma Client
   npx prisma db push    # Push schema to database
   npx prisma db seed    # Seed initial data
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Default Users and Roles

The seed script creates the following default users:

### Admin User
- Email: admin@example.com
- Password: admin123
- Role: ADMIN
- Permissions: All permissions

### Regular User
- Email: user@example.com
- Password: user123
- Role: USER
- Permissions: user:read

## Type System

The application includes a comprehensive type system:

### Auth Types
- `User`, `Role`, `Permission`, `Session` (Prisma-generated)
- `SafeUser` (User without sensitive information)
- `AuthSession` (Session with user information)
- `UserWithRole` (User with role and permissions)

### Permission Types
- `Resource` ('users' | 'roles' | 'permissions')
- `Action` ('create' | 'read' | 'update' | 'delete')
- `PermissionCheck` (Resource + Action combination)

### Utility Types
- `AsyncOperationResult<T>`
- `PaginationParams`
- `PaginatedResponse<T>`
- `FormSubmissionState`
- `ApiResponse<T>`

## Authentication

This template uses NextAuth.js v4 for authentication. It supports:

- OAuth Providers
  - GitHub (pre-configured)
  - Easy to add Google, Microsoft, etc.
- Session Management
- Account Linking
- Protected API Routes
- Protected Pages

### Adding More OAuth Providers

To add more providers:

1. Get OAuth credentials from the provider
2. Add credentials to `.env`
3. Add provider to NextAuth configuration

## Role-Based Access Control

The template includes a full RBAC system with:

### Default Roles
- ADMIN: Full system access
- USER: Basic user access

### Default Permissions
- user:read - Read user information
- user:write - Create and update users
- user:delete - Delete users
- role:manage - Manage roles and permissions

## Utility Functions

The application includes several utility function modules for common operations:

### Permission Utilities (`src/utils/permissions.ts`)
- Permission checking and validation
- Resource access control
- Role-based permission verification

### Role Management (`src/utils/roles.ts`)
- Role creation and assignment
- Default role management
- Role validation and verification

### Session Handling (`src/utils/session.ts`)
- Session creation and validation
- Token-based authentication
- Session cleanup and management
- Automatic session expiry (24 hours)

### Error Handling (`src/utils/errors.ts`)
- Custom error classes for different scenarios
- Standardized error responses
- Type-safe error handling

## Project Structure

```
├── app/                 # Next.js app directory
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared logic
├── prisma/            # Database schema and migrations
├── src/
│   └── types/         # TypeScript type definitions
└── public/            # Static assets
```

## Database Configuration

This template uses Prisma as an ORM, which supports various PostgreSQL hosting options:

1. **Serverless Options:**
   - Neon (recommended for development)
   - AWS Aurora Serverless
   - CockroachDB

2. **Traditional Hosting:**
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for PostgreSQL
   - Self-hosted PostgreSQL

## Learn More

To learn more about the technologies used in this template:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js v4 Documentation](https://next-auth.js.org/v4/getting-started/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

This template is ready to deploy on various platforms. Key considerations:

1. Set up your environment variables:
   - Database connection string
   - NextAuth.js configuration
   - OAuth provider credentials

2. Database considerations:
   - Ensure your database is accessible from your hosting environment
   - Configure connection pools appropriately
   - Set up SSL if required by your provider

3. Run database migrations before deploying new versions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
