# How to verify Home page

## Local Development
1. **Start Supabase**: `npx supabase start`
2. **Start dev server**: `npm run dev`
3. **Visit**: http://localhost:3000

## What to verify:
- ✅ **SEO**: Page title, meta description, Open Graph tags
- ✅ **Accessibility**: Semantic HTML, proper heading hierarchy, alt text
- ✅ **Responsive**: Mobile-first layout, scales on sm/md/lg breakpoints
- ✅ **Performance**: Server-side rendering, Suspense loading states
- ✅ **Data**: 3 demo courses load from Supabase
- ✅ **Design**: shadcn/ui components, proper spacing, typography
- ✅ **Testing**: data-testid attributes on main sections

## Key sections:
- **Hero**: Large heading with CTA buttons
- **Features**: 3-column grid explaining platform benefits
- **Courses**: Suspense-wrapped server component fetching from DB
- **CTA**: Primary-colored call-to-action section
- **Footer**: Simple branding and copyright

## Test commands:
```bash
# Build test
npm run build

# Lighthouse audit
npx lighthouse http://localhost:3000 --output=html

# Database connection test
curl http://localhost:3000/api/test-db
```