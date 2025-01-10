# Next.js Web Application Template with User Management

A production-ready, full-stack TypeScript application built with Next.js 14. This template provides a solid foundation with pre-configured user management, authentication, and database setup. Built using PostgreSQL for data storage (with Prisma ORM) and styled with Tailwind CSS and Shadcn/UI components, it offers a modern and beautiful UI out of the box. Authentication is handled by NextAuth.js, providing a secure and flexible user management system. The entire application is type-safe and follows modern development practices with comprehensive testing and code quality tools.

Clone this template to quickly start building your own web application with all the essential features and best practices already in place.

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
- **Privacy-Focused Logging System**
  - Winston Logger Integration
  - Multiple Log Levels
  - File-based Logging
  - Development Console Logs
  - Error Tracking
  - Structured Log Format
- **Performance Analytics**
  - Vercel Analytics Integration
  - User Behavior Tracking
  - Performance Metrics
  - Real-time Analytics
- **Audit Logging**
  - Security event tracking
  - User action monitoring
  - Dual storage (DB + File system)
  - IP and User Agent logging
  - Administrative action tracking
  - Permission change logging

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

```env
# Database - Replace with your database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth - Generate a secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"

# GitHub OAuth - Get these from your GitHub OAuth app
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Logging
LOG_LEVEL="info" # debug, info, warn, error

# Rate Limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW_MS="900000" # 15 minutes
```

## 🛠️ Installation

1. Clone and rename the template:
   ```bash
   git clone https://github.com/skezyoxo/webapp-template-with-user-management.git my-webapp
   cd my-webapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   > **Note for Windows users**: During installation, you may see warnings about `chmod` not being recognized. These warnings are expected and can be safely ignored - the installation will complete successfully.

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
   npm run db:seed
   ```

5. Start development:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📚 Deployment

### Vercel Deployment (Recommended)
1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Import your forked repository
4. Configure environment variables in Vercel's dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `GITHUB_ID` and `GITHUB_SECRET`: From your GitHub OAuth app
   - `LOG_LEVEL`: Set to "info" for production
   - `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS`: Adjust based on your needs
5. Update your GitHub OAuth app:
   - Go to your GitHub OAuth app settings
   - Add your Vercel deployment URL to the callback URLs:
     - `https://your-app.vercel.app/api/auth/callback/github`
6. Deploy! Vercel will automatically build and deploy your application

### Railway/Supabase Database Deployment
1. Create a new project on [Railway](https://railway.app) or [Supabase](https://supabase.com)
2. Create a new PostgreSQL database
3. Get your database connection details:
   - For Railway: Use the connection URL provided in your project settings
   - For Supabase: Get the connection string from Database Settings > Connection String > URI
4. Configure environment variables:
   - Set all the same variables as in Vercel deployment
   - Update `DATABASE_URL` with your new database connection string
5. Run database migrations:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Issues
- **Error**: `Can't reach database server`
  - Check if PostgreSQL is running
  - Verify DATABASE_URL format
  - Ensure database server is accessible from deployment environment
  - Check if IP is whitelisted in database configuration

#### Authentication Problems
- **Error**: OAuth login not working
  - Verify GITHUB_ID and GITHUB_SECRET are correct
  - Ensure OAuth callback URLs are configured correctly
  - Check if NEXTAUTH_URL matches your deployment URL
  - Clear browser cookies and try again

#### Build Failures
- **Error**: Build failing on deployment
  - Run `npm run build` locally first to identify issues
  - Check Node.js version compatibility
  - Verify all environment variables are set
  - Clear `.next` folder and node_modules, then rebuild

#### Prisma Issues
- **Error**: Prisma Client not generated
  - Run `npx prisma generate` before building
  - Ensure DATABASE_URL is accessible during build
  - Check Prisma schema syntax
  - Verify database permissions

#### Rate Limiting
- **Error**: Too many requests
  - Adjust RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_MS
  - Check if you're behind a proxy and configure accordingly
  - Implement proper load balancing for production

### Performance Optimization
1. Enable caching:
   ```bash
   npm run build
   ```
2. Optimize images and static assets
3. Configure CDN for static content
4. Enable compression middleware
5. Implement proper database indexing

### Debug Mode
To enable detailed logging:
1. Set LOG_LEVEL="debug" in .env
2. Check logs/error.log and logs/combined.log
3. Use browser developer tools for frontend issues
4. Monitor database query performance

For more help, please [open an issue](https://github.com/skezyoxo/webapp-template-with-user-management/issues) with:
- Detailed error message
- Steps to reproduce
- Environment details (OS, Node version, etc.)
- Relevant log outputs

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
Privacy-focused logging system stored in the `logs` directory:
- `error.log`: Error-level logs
- `combined.log`: All log levels
- Console logs in development
- Structured JSON format for easy parsing
- Configurable log levels
- Automatic log rotation

### Monitoring
- Vercel Analytics: Basic performance monitoring
- Winston Logging: Error tracking and system monitoring
- Custom error boundaries for React components

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

### Security Configuration Checklist
When deploying your application, use this checklist to enhance security beyond the template's base features:

#### Authentication Enhancements
- [ ] Configure additional OAuth providers beyond GitHub
- [ ] Implement 2FA/MFA for sensitive operations
- [ ] Add CAPTCHA for login and registration forms
- [ ] Set up IP allowlisting for admin routes
- [ ] Configure custom session timeout settings

#### Monitoring Setup
- [ ] Set up security monitoring alerts
- [ ] Configure log retention policies
- [ ] Set up automated security scanning
- [ ] Configure uptime monitoring
- [ ] Set up error tracking services

#### Additional Logging
- [ ] Configure audit log retention period
- [ ] Add logging for these sensitive operations:
  - [ ] User profile updates
  - [ ] Data exports
  - [ ] Configuration changes
  - [ ] Access to sensitive data
  - [ ] Failed authentication attempts

#### Testing & Validation
- [ ] Add security-focused test cases:
  - [ ] Authentication flows
  - [ ] Authorization checks
  - [ ] Input validation
  - [ ] Rate limiting
  - [ ] File upload security
- [ ] Perform security audit
- [ ] Run penetration testing

Note: This checklist represents additional security measures to implement based on your specific needs. The template already includes essential security features documented in the Core Features section above.

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
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Winston](https://github.com/winstonjs/winston) - Logging
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Lucide React](https://lucide.dev/) - Icons
- [Jest](https://jestjs.io/) - Testing
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks
