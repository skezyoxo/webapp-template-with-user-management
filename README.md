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
- Type safety with TypeScript

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

   After choosing your database provider:
   - Create a `.env` file in the root directory
   - Add your database URL and auth configuration:
     ```env
     DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
     
     # NextAuth.js Configuration
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret-key # Generate one with: openssl rand -base64 32
     
     # GitHub OAuth
     GITHUB_ID=your-github-client-id
     GITHUB_SECRET=your-github-client-secret
     ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

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

- User Roles (e.g., admin, user)
- Granular Permissions
- Resource-Based Access
- Permission Checking Utilities

Default roles and permissions can be configured in the seed file.

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          # Reusable UI components
├── lib/                 # Utility functions and shared logic
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## Database Configuration

This template uses Prisma as an ORM, which supports various PostgreSQL hosting options:

1. **Serverless Options:**
   - Neon (example in setup instructions)
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
