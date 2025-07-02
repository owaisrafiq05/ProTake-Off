# Protakeoffs.ai

A digital marketplace where landscaping and irrigation companies can instantly purchase completed project takeoffs. Built with modern web technologies for a fast, reliable, and user-friendly experience.

## 🚀 Project Overview

Protakeoffs.ai streamlines the bidding process for landscaping and irrigation companies by providing instant access to professionally prepared project takeoffs. Companies can browse, filter, and purchase takeoffs based on project size, type, and location.

### Key Features

- **Instant Takeoffs**: Pre-calculated material lists and labor estimates
- **Tiered Pricing**: Small ($50), Medium ($100), and Large ($150) project categories
- **Professional Delivery**: Excel format with detailed breakdowns
- **Location-Based Search**: Filter by zip code and project specifications
- **Responsive Design**: Optimized for desktop and mobile devices

## 🏗️ Project Structure

```
Protakeoffs.ai/
├── public/                     # Static assets
│   ├── favicon.ico            # Site favicon
│   ├── hero.png              # Main hero section image
│   ├── logo.png              # Company logo
│   ├── Protakeoffs.ai.png     # Brand text logo
│   └── robots.txt            # SEO robots file
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn-ui components
│   │   │   ├── button.tsx   # Custom button component
│   │   │   ├── card.tsx     # Card layout component
│   │   │   ├── input.tsx    # Form input component
│   │   │   └── ...          # Other UI primitives
│   │   ├── Benefits.tsx     # Benefits showcase section
│   │   ├── CallToAction.tsx # CTA section component
│   │   ├── ContactForm.tsx  # Contact form component
│   │   ├── Footer.tsx       # Site footer with links & social
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Main hero section
│   │   ├── HowItWorks.tsx   # Process explanation section
│   │   ├── TakeoffFinder.tsx # Takeoff search component
│   │   └── Testimonials.tsx # Customer testimonials
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx   # Mobile detection hook
│   │   └── use-toast.ts     # Toast notification hook
│   ├── lib/                 # Utility libraries
│   │   └── utils.ts         # Helper functions & utilities
│   ├── pages/               # Main application pages
│   │   ├── FindTakeoffs.tsx # Browse & filter takeoffs
│   │   ├── Index.tsx        # Homepage with all sections
│   │   ├── NotFound.tsx     # 404 error page
│   │   └── Pricing.tsx      # Pricing plans page
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles & Tailwind imports
│   └── main.tsx             # Application entry point
├── components.json          # shadcn-ui configuration
├── package.json             # Dependencies & scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## 🎨 Design System

### Color Palette

- **Primary Green**: `#16a34a` (green-600) - Main brand color
- **Primary Green Hover**: `#15803d` (green-700) - Interactive states
- **Text Primary**: `#111827` (gray-900) - Main headings
- **Text Secondary**: `#6b7280` (gray-600) - Body text
- **Background**: `#ffffff` (white) - Clean, professional look
- **Borders**: `#e5e7eb` (gray-200) - Subtle separations

### Typography

- **Headings**: Bold, large sizes (text-4xl to text-5xl)
- **Body Text**: Clean, readable (text-lg to text-xl)
- **Font Stack**: System fonts for optimal performance

### Layout Principles

- **Container**: Max-width 7xl (1280px) with responsive padding
- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Spacing**: Consistent padding/margin scale (py-12, py-16, py-20)
- **Cards**: Rounded corners, subtle shadows, clean borders

## 🧩 Component Architecture

### Page Components (`src/pages/`)

- **Index.tsx**: Homepage combining all marketing sections
- **Pricing.tsx**: Detailed pricing plans with feature comparisons
- **FindTakeoffs.tsx**: Search interface with filters and results
- **NotFound.tsx**: User-friendly 404 error handling

### Layout Components

- **Header.tsx**: Sticky navigation with logo and menu items
- **Footer.tsx**: Site footer with links, social media, and branding
- **Hero.tsx**: Main landing section with value proposition

### Feature Components

- **Benefits.tsx**: Key benefits showcase with icons
- **HowItWorks.tsx**: Step-by-step process explanation
- **Testimonials.tsx**: Customer reviews with profile images
- **CallToAction.tsx**: Conversion-focused sections
- **ContactForm.tsx**: Contact form with validation

### UI Components (`src/components/ui/`)

Built on shadcn-ui for consistency and accessibility:

- **Button**: Primary, secondary, and outline variants
- **Card**: Flexible container for content sections
- **Input**: Form inputs with proper styling
- **Toast**: Notification system for user feedback

## 🛠️ Technology Stack

### Frontend Framework

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast development server and optimized builds

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn-ui**: Pre-built, accessible component library
- **Lucide React**: Modern icon library

### Routing & State

- **React Router**: Client-side routing for SPA navigation
- **TanStack Query**: Server state management and caching

### Development Tools

- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization
- **TypeScript**: Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git for version control

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ProTake-Off

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px+ (lg, xl)

Key responsive features:

- Mobile-first design approach
- Collapsible navigation menu
- Responsive grid layouts
- Optimized touch targets
- Scalable typography

## 🔧 Configuration Files

### `tailwind.config.ts`

- Custom color palette
- Extended spacing scale
- Component-specific utilities

### `vite.config.ts`

- Path aliases for clean imports
- Build optimization settings
- Development server configuration

### `tsconfig.json`

- Strict TypeScript configuration
- Path mapping for imports
- Modern ECMAScript target

## 🌐 Deployment

### Lovable Platform

1. Visit the [Lovable Project](https://lovable.dev/projects/095db277-0f5a-43f3-b727-caa6b97bee03)
2. Click Share → Publish
3. Configure custom domain if needed

### Alternative Deployments

- **Vercel**: `npm run build` → Deploy dist folder
- **Netlify**: Connect GitHub repo for automatic deployments
- **AWS S3**: Static site hosting with CloudFront CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Protakeoffs.ai. All rights reserved.

## 📞 Support

For technical support or questions:

- Email: support@Protakeoffs.ai
- Documentation: [Project Wiki](https://lovable.dev/projects/095db277-0f5a-43f3-b727-caa6b97bee03)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
