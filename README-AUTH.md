# Foodiety Authentication System & Admin Panel

A comprehensive, production-ready authentication system and admin panel built with Next.js 14+, TypeScript, Prisma, and NextAuth.js.

## 🚀 Features

### Authentication System
- ✅ Secure user registration and login
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT-based session management
- ✅ Role-based access control (USER/ADMIN)
- ✅ Password reset functionality
- ✅ Form validation with Zod
- ✅ Rate limiting on auth endpoints
- ✅ Audit logging for security events

### Admin Panel
- ✅ Protected admin dashboard
- ✅ User management (CRUD operations)
- ✅ Bulk user actions (delete, activate, role changes)
- ✅ User search and filtering
- ✅ Pagination (10 users per page)
- ✅ Data visualization (user growth charts)
- ✅ Recent activity monitoring
- ✅ Responsive design (mobile, tablet, desktop)

### Security Features
- ✅ CSRF protection
- ✅ Input sanitization and validation
- ✅ Rate limiting (5 signup attempts per 15 minutes)
- ✅ Secure password requirements
- ✅ Session management
- ✅ Audit trail for admin actions

## 🛠 Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **Password Hashing**: bcrypt
- **HTTP Client**: Axios with interceptors
- **Validation**: Zod
- **Forms**: React Hook Form
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd foodiety
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb foodiety_db

# Copy environment variables
cp .env.example .env

# Update .env with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/foodiety_db"
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Migration & Seeding

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Default Credentials

After seeding, you can use these credentials:

**Admin User:**
- Email: `admin@foodiety.com`
- Password: `admin123`

**Regular Users:**
- Email: `john.doe@example.com` (and others)
- Password: `password123`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/forgot-password`
Request password reset token.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### POST `/api/auth/reset-password`
Reset password with token.

**Request Body:**
```json
{
  "token": "reset-token",
  "password": "NewSecurePass123",
  "confirmPassword": "NewSecurePass123"
}
```

### Admin Endpoints (Requires ADMIN role)

#### GET `/api/admin/users`
Get paginated list of users.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for name/email
- `role`: Filter by role (USER/ADMIN)
- `isActive`: Filter by active status (true/false)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### POST `/api/admin/users`
Create a new user.

#### GET `/api/admin/users/[id]`
Get user by ID.

#### PUT `/api/admin/users/[id]`
Update user.

#### DELETE `/api/admin/users/[id]`
Delete user.

#### POST `/api/admin/users/bulk`
Bulk actions on multiple users.

**Request Body:**
```json
{
  "userIds": ["id1", "id2", "id3"],
  "action": "delete" | "activate" | "deactivate" | "makeAdmin" | "makeUser"
}
```

#### GET `/api/admin/stats`
Get dashboard statistics.

## 🏗 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   │   ├── signup/route.ts           # User registration
│   │   │   ├── forgot-password/route.ts  # Password reset request
│   │   │   └── reset-password/route.ts   # Password reset
│   │   └── admin/
│   │       ├── users/route.ts            # User CRUD operations
│   │       ├── users/[id]/route.ts       # Individual user operations
│   │       ├── users/bulk/route.ts       # Bulk user operations
│   │       └── stats/route.ts            # Dashboard statistics
│   ├── auth/
│   │   ├── signin/page.tsx               # Login page
│   │   └── signup/page.tsx               # Registration page
│   └── admin/
│       ├── layout.tsx                    # Admin layout with sidebar
│       ├── page.tsx                      # Admin dashboard
│       └── users/page.tsx                # User management page
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx              # Admin navigation sidebar
│   │   ├── AdminHeader.tsx               # Admin header with user menu
│   │   ├── StatsChart.tsx                # User growth chart
│   │   └── RecentActivity.tsx            # Recent activity feed
│   └── ui/                               # Reusable UI components
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── prisma.ts                         # Prisma client setup
│   ├── api-client.ts                     # Axios configuration
│   ├── middleware.ts                     # API middleware utilities
│   └── validations/
│       ├── auth.ts                       # Auth validation schemas
│       └── user.ts                       # User validation schemas
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── seed.ts                           # Database seeding script
└── types/
    └── next-auth.d.ts                    # NextAuth type extensions
```

## 🔒 Security Best Practices

### Password Security
- Minimum 8 characters with uppercase, lowercase, and numbers
- bcrypt hashing with 12 rounds
- Password confirmation validation
- Secure password reset flow

### Authentication Security
- JWT tokens with secure secrets
- Session expiration (30 days)
- Rate limiting on auth endpoints
- CSRF protection
- Input sanitization

### Database Security
- Parameterized queries (Prisma)
- Connection pooling
- Audit logging for sensitive operations
- Soft deletes for user data

### API Security
- Role-based access control
- Request validation with Zod
- Error message sanitization
- Rate limiting per IP

## 📱 Responsive Design

The application is fully responsive and works on:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Mobile-first design approach
- Collapsible admin sidebar
- Touch-friendly interactions
- Optimized forms for mobile
- Responsive data tables

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User registration with validation
- [ ] User login with correct/incorrect credentials
- [ ] Password reset flow
- [ ] Session persistence
- [ ] Role-based redirects

**Admin Panel:**
- [ ] Dashboard statistics display
- [ ] User list with pagination
- [ ] User search and filtering
- [ ] User creation/editing/deletion
- [ ] Bulk user operations
- [ ] Responsive design on mobile

**Security:**
- [ ] Rate limiting on signup
- [ ] Unauthorized access prevention
- [ ] Input validation and sanitization
- [ ] Audit log creation

## 🚀 Deployment

### Environment Variables for Production

```bash
# Database (use connection pooling for production)
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true"

# NextAuth (use secure random secret)
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# Email (for password reset)
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database Migration for Production

```bash
# Run migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

## 🔧 Customization

### Adding New User Fields

1. Update Prisma schema in `prisma/schema.prisma`
2. Run migration: `npm run db:migrate`
3. Update validation schemas in `lib/validations/`
4. Update API endpoints and forms

### Adding New Admin Features

1. Create new API routes in `app/api/admin/`
2. Add navigation items to `AdminSidebar.tsx`
3. Create new admin pages in `app/admin/`
4. Update middleware for authorization

### Customizing Email Templates

1. Install email template library (e.g., `@react-email/components`)
2. Create email templates in `emails/` directory
3. Update password reset endpoint to use templates

## 📞 Support

For questions or issues:
1. Check the API documentation above
2. Review the code comments
3. Test with the provided seed data
4. Verify environment variables are set correctly

## 🎯 Production Checklist

Before deploying to production:

- [ ] Update all environment variables
- [ ] Set secure NEXTAUTH_SECRET
- [ ] Configure production database
- [ ] Set up email service for password reset
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Test all authentication flows
- [ ] Verify admin panel functionality
- [ ] Test responsive design on real devices

---

This authentication system provides a solid foundation for any Next.js application requiring user management and admin capabilities. The code is production-ready with proper error handling, security measures, and comprehensive documentation.