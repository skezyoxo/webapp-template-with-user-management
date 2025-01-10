# Next.js Web Application Template with User Management

A production-ready template for building modern web applications with Next.js 14. This template provides a solid foundation with pre-configured user management, authentication, database setup, and a beautiful UI. Clone this template to quickly start building your own web application with all the essential features and best practices already in place.

## 🚀 Getting Started

This template is designed to be your starting point. Here's what you'll need to customize:

1. **Database**: Set up your own PostgreSQL database and update the connection string
2. **Authentication**: Configure your own GitHub OAuth app (or add other providers)
3. **Environment Variables**: Set up your own secrets and configuration
4. **Branding**: Update the UI with your own branding and styling

## ✨ Core Features

### Security & Performance
- **Security Headers**
  - HTTP Security Headers
  - Content Security Policy
  - XSS Protection
  - HSTS Configuration
  - Frame Protection
  - DNS Prefetching Control
- **Rate Limiting**
  - API Route Protection
  - Configurable Limits
  - Custom Rate Limiting Rules
  - IP-based Limiting

### Monitoring & Logging
- **Error Tracking**
  - Sentry Integration
  - Real-time Error Monitoring
  - Performance Monitoring
  - User Session Replay
- **Logging System**
  - Winston Logger Integration
  - Multiple Log Levels
  - File-based Logging
  - Development Console Logs
- **Performance Analytics**
  - Vercel Analytics Integration
  - User Behavior Tracking
  - Performance Metrics
  - Real-time Analytics

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

### Development & Documentation
- **API Documentation**
  - Swagger/OpenAPI Integration
  - Interactive API Explorer
  - Automatic Route Documentation
  - Authentication Documentation
- **CI/CD Pipeline**
  - GitHub Actions Integration
  - Automated Testing
  - Linting & Type Checking
  - Deployment Automation
  - Code Coverage Reports
- **TypeScript Support**
  - Full type safety
  - Generated Prisma types
  - Type-safe API routes
  - Auth session types
  - Role-based operation types
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
- GitHub account (for OAuth setup)

### Environment Variables
Create a `.env` file based on `.env.example`. You'll need to:

1. Set up a PostgreSQL database and add your connection string
2. Create a GitHub OAuth app at https://github.com/settings/developers
3. Generate a secure NEXTAUTH_SECRET (instructions below)
4. Set up Sentry (optional, for error tracking)

```env
# Database - Replace with your database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth - Generate a secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"

# GitHub OAuth - Get these from your GitHub OAuth app
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Sentry - Optional, for error tracking
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"

# Logging
LOG_LEVEL="info" # debug, info, warn, error

# Rate Limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW_MS="900000" # 15 minutes
```

## 🛠️ Installation

1. Clone and rename the template:
   ```bash
   git clone https://github.com/yourusername/webapp-with-user-management.git my-webapp
   cd my-webapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment:
   ```bash
   cp .env.example .env
   ```
   Then follow these steps:
   - Create a PostgreSQL database
   - Set up GitHub OAuth (or other providers)
   - Update `.env` with your values
   - Generate NEXTAUTH_SECRET (see command above)

4. Initialize your database:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed with initial data (optional)
   npx prisma db seed
   ```

5. Start development:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📚 Project Structure

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

## 📚 Documentation

### API Documentation
Access the API documentation at `/docs` when running the application. This provides:
- Interactive API Explorer
- Authentication Details
- Request/Response Examples
- Schema Documentation

### Logging
Logs are stored in the `logs` directory:
- `error.log`: Error-level logs
- `combined.log`: All log levels
- Console logs in development

### Monitoring
- Sentry Dashboard: Error tracking and performance monitoring
- Vercel Analytics: User behavior and performance metrics

## 🔒 Security

### Headers
Pre-configured security headers:
- `X-DNS-Prefetch-Control`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`
- `Referrer-Policy`
- `Permissions-Policy`

### Rate Limiting
API routes are protected with rate limiting:
- Default: 100 requests per 15 minutes
- Customizable per route
- IP-based tracking

## 📜 Authentication Flow

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

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run db:seed` - Seed the database
- `npm run db:reset` - Reset and reseed database

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐️ Support

If you found this template helpful, please give it a star! ⭐️

## 🙏 Acknowledgments

Built with these amazing technologies:
- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - UI components
