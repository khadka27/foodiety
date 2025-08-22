# Foodiety - Production-Ready Food Platform

A comprehensive, modern food platform built with Next.js 15, featuring real-time functionality, advanced authentication, and a complete admin system.

## 🚀 **Key Features**

### **🔐 Advanced Authentication System**
- **Dual Login Options**: Email or username authentication
- **Real-time Validation**: Live availability checking for usernames and emails
- **Password Strength Indicator**: Visual feedback with security requirements
- **Email Verification**: OTP-based email verification with Nodemailer
- **Secure Password Reset**: Token-based password recovery system
- **Role-based Access Control**: USER and ADMIN roles with proper permissions

### **⚡ Real-time Features**
- **Socket.io Integration**: Real-time notifications and updates
- **Live Toast Notifications**: Instant feedback for all user actions
- **Real-time Form Validation**: Immediate feedback on form inputs
- **Live Availability Checking**: Username/email availability in real-time

### **💾 Production Database**
- **PostgreSQL with Prisma ORM**: Robust, scalable database solution
- **Comprehensive Schema**: Users, recipes, restaurants, reviews, wishlists, notifications
- **Data Relationships**: Proper foreign keys and cascading deletes
- **Audit Logging**: Complete activity tracking for security and analytics
- **Database Seeding**: Sample data for development and testing

### **🎯 Advanced User Experience**
- **Wishlist Functionality**: Save favorite recipes and restaurants (login required)
- **Advanced Search & Filtering**: Multi-criteria search with real-time results
- **Recommendation System**: AI-powered suggestions based on user behavior
- **Loading States**: Smooth loading indicators for all interactions
- **Form Validation**: Comprehensive client and server-side validation
- **SEO Optimization**: Meta tags, structured data, and search engine friendly URLs

### **📱 Modern UI/UX**
- **Responsive Design**: Mobile-first approach with perfect tablet/desktop scaling
- **Dark/Light Theme**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation
- **Toast Notifications**: React Hot Toast for beautiful, accessible notifications

## 🛠 **Technology Stack**

### **Frontend**
- **Next.js 15.1.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **shadcn/ui** - Modern UI components

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication system
- **Prisma ORM** - Database management
- **PostgreSQL** - Production database
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications
- **Socket.io** - Real-time communication

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database GUI

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL 14+
- pnpm 8+ (recommended)

### **1. Clone & Install**
```bash
git clone <repository-url>
cd foodiety
pnpm install
```

### **2. Environment Setup**
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/foodiety_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Email (Gmail example)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@foodiety.com"
```

### **3. Database Setup**
```bash
# Create database
createdb foodiety_db

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma db push

# Seed with sample data
pnpm prisma db seed
```

### **4. Start Development**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 🔐 **Default Credentials**

**Admin Account:**
- Email: `admin@foodiety.com`
- Password: `admin123`

**Test Users:**
- Email: `john.doe@example.com`
- Username: `johndoe`
- Password: `password123`

## 🏗 **Project Structure**

```
foodiety/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── wishlist/             # Wishlist management
│   │   └── socket/               # Socket.io handler
│   ├── auth/                     # Authentication pages
│   ├── admin/                    # Admin panel
│   ├── wishlist/                 # User wishlist page
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── WishlistButton.tsx        # Wishlist functionality
│   ├── SearchFilters.tsx         # Advanced filtering
│   └── Navigation.tsx            # Main navigation
├── hooks/                        # Custom React hooks
│   ├── use-socket.ts             # Socket.io integration
│   └── use-wishlist.ts           # Wishlist management
├── lib/                          # Utility functions
│   ├── auth.ts                   # NextAuth configuration
│   ├── email.ts                  # Email templates & sending
│   ├── prisma.ts                 # Database client
│   ├── socket.ts                 # Socket.io server setup
│   └── validations/              # Zod schemas
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Sample data
└── types/                        # TypeScript definitions
```

## 🔧 **Key Features Implementation**

### **Real-time Username/Email Checking**
```typescript
// Debounced availability checking
useEffect(() => {
  const checkAvailability = async () => {
    const response = await axios.post('/api/auth/check-availability', {
      type: 'username',
      value: watchedUsername,
    });
    setUsernameAvailable(response.data.available);
  };
  
  const debounceTimer = setTimeout(checkAvailability, 500);
  return () => clearTimeout(debounceTimer);
}, [watchedUsername]);
```

### **Password Strength Validation**
```typescript
// Real-time password strength checking
const strength = checkPasswordStrength(password);
// Returns: { score: 0-4, feedback: string[], isValid: boolean }
```

### **Wishlist System**
```typescript
// Hook-based wishlist management
const { isInWishlist, toggleWishlist } = useWishlist();
const inWishlist = isInWishlist('recipe', recipeId);
await toggleWishlist('recipe', recipeId);
```

### **Socket.io Real-time Notifications**
```typescript
// Real-time notification system
const { sendNotification } = useSocket();
sendNotification({
  userId: targetUserId,
  type: 'like',
  message: 'Someone liked your recipe!',
});
```

## 🚀 **Deployment**

### **Environment Variables for Production**
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
NEXTAUTH_SECRET="production-secret-key-very-long-and-random"
NEXTAUTH_URL="https://yourdomain.com"
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
```

### **Build & Deploy**
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Database migration for production
pnpm prisma migrate deploy
```

### **Recommended Hosting**
- **Vercel** (recommended for Next.js)
- **Railway** (for full-stack with database)
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📊 **Database Schema Highlights**

### **User Management**
- Comprehensive user profiles with avatars and bios
- Email verification and password reset tokens
- Role-based permissions (USER/ADMIN)
- Audit logging for security tracking

### **Content Management**
- Recipes with ingredients, instructions, and nutrition info
- Restaurants with location, hours, and features
- Blog posts with rich content and categorization
- Reviews and ratings system

### **Social Features**
- Wishlist system for saving favorites
- Like/unlike functionality
- Follow system for users
- Comment system with nested replies

### **Real-time Features**
- Notification system with read/unread status
- Audit logs for tracking all user actions
- Email verification and password reset workflows

## 🔍 **SEO Optimization**

- **Meta Tags**: Dynamic meta descriptions and titles
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

## 🛡 **Security Features**

- **Password Hashing**: bcrypt with 12 rounds
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: React's built-in protection
- **Audit Logging**: Complete activity tracking

## 📈 **Performance Optimizations**

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Proper cache headers and strategies
- **Database Indexing**: Optimized queries
- **Bundle Analysis**: Optimized package imports

## 🧪 **Testing**

### **Manual Testing Checklist**
- [ ] User registration with email verification
- [ ] Username/email availability checking
- [ ] Password strength validation
- [ ] Login with email or username
- [ ] Wishlist add/remove functionality
- [ ] Real-time notifications
- [ ] Search and filtering
- [ ] Responsive design on all devices
- [ ] Admin panel functionality

## 📞 **Support & Documentation**

### **API Documentation**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/check-availability` - Username/email checking
- `POST /api/auth/verify-email` - Email verification
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/[id]` - Remove from wishlist

### **Development Commands**
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript checking
pnpm prisma studio # Open database GUI
```

## 🎯 **Production Checklist**

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Email service configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Analytics setup
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Performance monitoring
- [ ] Security headers configured

---

This is a production-ready, feature-rich food platform that demonstrates modern web development best practices with real-time functionality, comprehensive authentication, and excellent user experience. The system is built to scale and can handle thousands of concurrent users with proper hosting infrastructure.