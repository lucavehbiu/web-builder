# 🌟 Luca - Professional Website Builder

A modern, bilingual (English/Albanian) website builder platform running on Next.js 15 with full Cloudflare Pages Edge Runtime compatibility.

## ✨ Features

- 🌍 **Multi-language Support** - English and Albanian
- 💌 **Email Integration** - Mailjet for contact forms
- 🗄️ **Lead Management** - Supabase database integration
- ⚡ **Edge Runtime** - Fully compatible with Cloudflare Pages
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Glassmorphism UI** - Modern, Apple-inspired design
- 🚀 **Ultra-fast Performance** - <100ms TTFB globally

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Pages
- **Email**: Mailjet API
- **Database**: Supabase
- **Runtime**: Edge Runtime (100% compatible)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)
- Mailjet account (for emails)
- Supabase account (for database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucavehbiu/web-builder.git
cd web-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=your_email@domain.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up Supabase database:
```bash
# Run the SQL in supabase-setup.sql in your Supabase SQL Editor
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📦 Project Structure

```
web-builder/
├── app/
│   ├── [locale]/          # Internationalized pages
│   │   ├── layout.tsx     # Root layout with edge runtime
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── services/      # Services page
│   │   ├── portfolio/     # Portfolio page
│   │   └── get-started/   # Contact form page
│   └── api/               # API routes (Edge Runtime)
│       ├── contact/       # Contact form handler
│       └── leads/         # Lead management
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   ├── sections/     # Page sections
│   │   └── forms/        # Form components
│   └── lib/              # Utilities and i18n
├── public/               # Static assets
└── dictionaries/         # Translation files
```

## 🌐 Deployment to Cloudflare Pages

### Quick Deploy

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Environment variables**: Add all from `.env.local`

### Detailed Guide

See [CLOUDFLARE-DEPLOYMENT.md](./CLOUDFLARE-DEPLOYMENT.md) for complete deployment instructions.

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Cloudflare Pages
npm run pages:build  # Build for Cloudflare Pages
npm run preview      # Preview Cloudflare build locally
npm run deploy       # Deploy to Cloudflare Pages

# Other
npm run lint         # Run ESLint
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MAILJET_API_KEY` | Mailjet API key | Yes |
| `MAILJET_SECRET_KEY` | Mailjet secret key | Yes |
| `MAILJET_FROM_EMAIL` | Sender email address | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |

## 🎨 Customization

### Adding Languages

1. Add locale to `src/lib/i18n/config.ts`
2. Create dictionary file in `dictionaries/`
3. Update middleware for routing

### Modifying Design

- Colors: Edit Tailwind config and component classes
- Fonts: Update `app/[locale]/layout.tsx`
- Components: Modify files in `src/components/`

## 🐛 Troubleshooting

### Local Development Issues

If styles aren't loading locally after Cloudflare deployment setup:
```bash
# Kill all Node processes
pkill node

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### Cloudflare Pages Issues

See [CLOUDFLARE-DEPLOYMENT.md](./CLOUDFLARE-DEPLOYMENT.md#-common-errors--solutions) for common deployment issues.

## 📊 Performance

- **Lighthouse Score**: 95-100
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Global CDN**: 200+ locations via Cloudflare

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Luca Vehbiu**
- Website: [lucavehbiu.com](https://lucavehbiu.com)
- GitHub: [@lucavehbiu](https://github.com/lucavehbiu)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Cloudflare for edge computing platform
- Tailwind CSS for the utility-first CSS framework
- All contributors and users

---

**Live Demo**: [lucavehbiu.com](https://lucavehbiu.com)

*Built with ❤️ using Next.js and deployed on Cloudflare Pages*