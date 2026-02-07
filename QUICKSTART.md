# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Key Features to Explore

### Homepage
- Beautiful hero section with animated elements
- Course categories showcase
- Statistics and testimonials
- Call-to-action sections

### Courses
- Browse all available courses
- Filter by category and level
- Search functionality
- Detailed course pages with batch information

### Enrollment
- Select course and batch
- Fill enrollment form
- View enrollment summary

### Dashboard
- View enrolled courses
- Track learning progress
- See achievements and stats

## 🎨 Design Highlights

- **Glassmorphism**: Modern glass-effect UI elements
- **Animations**: Smooth Framer Motion animations
- **Gradients**: Beautiful color gradients throughout
- **Responsive**: Mobile-first design approach
- **Typography**: Clean, readable fonts
- **Icons**: Lucide React icon library

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary colors: Blue tones
- Accent colors: Purple/Pink tones

### Content
- Courses: Edit `lib/data.ts`
- Categories: Edit `lib/data.ts`
- Batches: Edit `lib/data.ts`

### Styling
- Global styles: `app/globals.css`
- Component styles: Inline Tailwind classes

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy

This Next.js app can be deployed on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📝 Notes

- Currently uses mock data (can be replaced with a database)
- Authentication is ready for implementation
- Payment integration can be added
- Video streaming can be integrated

Enjoy building your coding training institute! 🎓
