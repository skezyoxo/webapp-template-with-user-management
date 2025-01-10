# Next.js Web Application Template with User Management

A modern, production-ready web application template built with Next.js 14, featuring comprehensive user management, authentication, and a beautiful UI. This template provides everything you need to kickstart your web application with best practices and essential features.

## 🚀 Demo

[Live Demo](your-demo-url) - Coming soon

![Screenshot of the application](screenshot-url-placeholder)

## ✨ Core Features

### Authentication & Authorization
- **NextAuth.js v4 Integration**
  - Email/Password authentication
  - GitHub OAuth support
  - Secure session management
  - Protected routes and API endpoints
  - Role-based access control (RBAC)
  - Profile management
  - Automatic session handling

### Database & Models
- **Prisma Schema**
  - User model with role relationships
  - Role and Permission models
  - Extensible database schema
  - Type-safe database operations
- **Seed Data**
  - Pre-configured roles (admin, user)
  - Default permissions
  - Test users for development
  - Role-permission relationships

### Modern UI/UX
- **Shadcn/UI Components**
  - Beautiful, accessible components
  - Consistent design language
  - Mobile-responsive layouts
  - Navigation bar with auth integration
- **Theme System**
  - Light/Dark mode support
  - Theme persistence
  - System theme detection
  - Smooth theme transitions
- **Loading States**
  - Consistent loading indicators
  - Button loading states
  - Form submission feedback
  - Skeleton loaders

### Development Features
- **TypeScript Support**
  - Full type safety
  - Generated Prisma types
  - Type-safe API routes
  - Auth session types
  - Role-based operation types
  - Comprehensive type definitions
- **Database Integration**
  - Prisma ORM
  - PostgreSQL support
  - Type-safe database queries
  - Automatic migrations
  - Seeding utilities
- **Testing Setup**
  - Jest configuration
  - React Testing Library
  - Component testing utilities
  - API route testing support
- **Code Quality**
  - ESLint configuration
  - Prettier formatting
  - Husky pre-commit hooks
  - Import sorting
- **Error Handling**
  - Global error boundary
  - API error middleware
  - Type-safe error responses
  - Consistent error UI

## 📋 Requirements

### Prerequisites
- Node.js 18.x or later
- PostgreSQL database
- Git

### Environment Variables
The following environment variables are required:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Then update the `.env` file with your values.

4. Initialize and seed the database:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed the database with initial data
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Your app should now be running on [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   └── auth/       # Authentication endpoints
│   ├── admin/          # Admin dashboard
│   ├── signin/         # Authentication pages
│   ├── register/       # User registration
│   └── profile/        # User profile management
├── components/         # React components
│   ├── ui/            # UI components
│   └── __tests__/     # Component tests
├── src/
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
│       ├── auth/      # Auth utilities
│       ├── permissions/# Permission helpers
│       └── errors/    # Error handling
├── prisma/            # Database schema
│   ├── schema.prisma  # Database models
│   └── seed.ts        # Seed data
└── public/            # Static assets
```

## 💾 Database Models

The template includes the following core models:

1. **User**
   - Basic user information
   - Role relationships
   - Authentication details

2. **Role**
   - Role definitions
   - Permission assignments
   - User associations

3. **Permission**
   - Granular access controls
   - Resource-based permissions
   - Role assignments

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run db:seed` - Seed the database
- `npm run db:reset` - Reset and reseed database

## 🔐 Authentication Flow

The template includes a complete authentication system:

1. **Email/Password Authentication**
   - Secure password hashing
   - Form validation
   - Error handling
   - Custom credentials provider

2. **OAuth Authentication**
   - GitHub integration
   - Extensible for other providers
   - Account linking support
   - OAuth callback handling

3. **Session Management**
   - Secure session tokens
   - Automatic token refresh
   - Session persistence
   - Role-based session data

4. **Authorization**
   - Role-based access control
   - Permission checking
   - Protected routes
   - API route protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐️ Support

If you found this template helpful, please consider giving it a star! ⭐️

## 🙏 Acknowledgments

Built with these amazing technologies:
- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - UI components
