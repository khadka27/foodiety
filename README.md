# Foodiety - Modern Food Content Website

A comprehensive food content platform built with Next.js 15.3, featuring custom error pages, loading screens, and a complete dark/light theme system.

## 🚀 Features

### Core Features
- **Modern Next.js 15.3** with App Router
- **React 19** with latest features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Dark/Light Theme** with system preference detection
- **Responsive Design** for all devices

### Custom Pages System
- **Loading Screen** - Animated loading with progress indicator
- **404 Error Page** - User-friendly "Page Not Found" with navigation
- **500 Error Page** - Server error handling with retry options
- **403 Forbidden Page** - Access denied with clear messaging
- **503 Service Unavailable** - Maintenance mode with progress
- **Global Error Boundary** - Catches critical application errors

### Design Features
- **Orange/Red Theme** with warm food-focused colors
- **Smooth Animations** and micro-interactions
- **Apple-level Design** aesthetics
- **Accessibility** compliant (WCAG guidelines)
- **SEO Optimized** with proper meta tags

## 🛠 Installation

### Prerequisites
- Node.js 18+ 
- pnpm 8+ (recommended package manager)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd foodiety

# Install dependencies with pnpm
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 📁 Project Structure

```
foodiety/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes
│   ├── 403/               # Forbidden error page
│   ├── 503/               # Service unavailable page
│   ├── error.tsx          # Error boundary
│   ├── global-error.tsx   # Global error handler
│   ├── not-found.tsx      # 404 page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── home/             # Home page sections
│   ├── LoadingScreen.tsx # Custom loading component
│   ├── Navigation.tsx    # Main navigation
│   └── Footer.tsx        # Site footer
├── lib/                  # Utility functions
├── middleware.ts         # Next.js middleware
└── public/              # Static assets
```

## 🎨 Theme System

### Color Palette
- **Primary**: Orange (#f97316) to Red (#dc2626) gradients
- **Secondary**: Warm earth tones
- **Dark Mode**: Rich, warm backgrounds that complement food imagery
- **Light Mode**: Clean whites with warm undertones

### Theme Toggle
- Light Mode → Dark Mode → System Mode cycle
- Persistent theme storage
- Smooth transitions between themes
- Respects user's OS preference

## 🚨 Error Handling

### Error Pages
- **404 (not-found.tsx)**: Page not found with navigation options
- **500 (error.tsx)**: Server errors with retry functionality  
- **403 (/403/page.tsx)**: Access denied with clear messaging
- **503 (/503/page.tsx)**: Maintenance mode with progress indicator
- **Global (global-error.tsx)**: Critical application errors

### Features
- **Analytics Tracking**: Error page visits logged
- **User-Friendly Messages**: Clear, helpful error descriptions
- **Navigation Options**: Multiple ways to recover from errors
- **Theme Consistent**: All error pages match site design
- **Responsive**: Works on all device sizes

## 🔧 Configuration

### Environment Variables
```bash
# Required
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Optional Analytics
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Optional Error Reporting
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-sentry-dsn
```

### Next.js Configuration
- **Static Export**: Configured for static site generation
- **Image Optimization**: Unoptimized for static export
- **Package Optimization**: Optimized imports for better performance
- **Console Removal**: Production builds remove console logs

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Features
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized images for all screen sizes

## 🚀 Performance

### Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized package imports
- **Lazy Loading**: Components loaded on demand
- **Caching**: Proper cache headers and strategies

### Loading States
- **Page Loading**: Custom animated loading screen
- **Component Loading**: Skeleton states
- **Image Loading**: Progressive loading with placeholders

## 🧪 Development

### Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm type-check   # TypeScript type checking
```

### Code Quality
- **ESLint**: Code linting with Next.js config
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for quality checks (optional)

## 🌐 Deployment

### Static Export
The project is configured for static export and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

### Build Process
```bash
pnpm build    # Generates static files in 'out' directory
```

## 🔒 Security

### Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Content-Security-Policy: Configured for security

### Best Practices
- Input validation and sanitization
- Secure cookie handling
- HTTPS enforcement (production)
- Error message sanitization

## 📊 Analytics & Monitoring

### Error Tracking
- Custom error page analytics
- Error boundary reporting
- Performance monitoring
- User experience tracking

### Integration Options
- Google Analytics
- Sentry for error reporting
- Custom analytics solutions
- Performance monitoring tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the example configurations

---

Built with ❤️ using Next.js 15.3, React 19, and modern web technologies.