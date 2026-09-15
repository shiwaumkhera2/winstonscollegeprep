# Winston College Prep — website

Marketing site for [Winston College Prep](https://winstoncollegeprep.net) (also known as Winston Academy): tutoring, test preparation and admissions coaching.

Built as a fully static site so it can be hosted for free on **GitHub Pages**.

| | |
| --- | --- |
| Framework | [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://motion.dev) |
| Routing | [react-router-dom](https://reactrouter.com) (`BrowserRouter` + `404.html` fallback) |
| SEO | [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| Icons | [lucide-react](https://lucide.dev) |
| Fonts | Playfair Display (headlines) and DM Sans (body and UI), loaded from Google Fonts |

---

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install        # first time only
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check, then build to dist/
npm run preview    # serve dist/ locally, exactly as GitHub Pages will
npm run typecheck  # TypeScript only
```

To test the contact form locally with a real form service, copy `.env.example` to `.env.local` and fill in the values (see [Contact form](#contact-form)).

---

## Project structure

```
public/                 Static files copied to the site root as-is
  CNAME                 Custom domain for GitHub Pages
  gallery/              Gallery photos (placeholders for now)
  logos/                Course logos (placeholders for now)
  portrait-placeholder.svg
  favicon.svg, og-image.*, robots.txt, sitemap.xml
src/
  config.ts             Business details: name, tagline, email, phone, WhatsApp, form endpoint
  data/
    courses.ts          The ten course cards
    testimonials.ts     YouTube video IDs
    gallery.ts          Gallery images
    features.ts         "Why Choose Winston" cards
    stats.ts            "Our Achievements" numbers
    nav.ts              Navigation links
  components/           Navbar, Footer, Hero, FeatureCard, StatsSection, CourseCard,
                        VideoGrid, Gallery, Lightbox, ContactForm, PageTransition, …
  pages/                Home, Services, Testimonials, GalleryPage, Contact, NotFound
  lib/
    variants.ts         Shared Framer Motion variants, easing and durations
    useCountUp.ts       Count-up hook for the stats section
.github/workflows/deploy.yml   Builds and publishes to GitHub Pages on every push to main
```

---

## Changing content

All copy and media live in typed data files. You should not need to touch a component to change text.

### Business details (email, phone, tagline)

Edit [`src/config.ts`](src/config.ts). Everything that shows the email address, phone number or WhatsApp link reads from here, including the footer, the contact strip and the Contact page.

### Courses

Edit [`src/data/courses.ts`](src/data/courses.ts). Each course has a `title`, `duration`, `description`, `components` list and a `logo`. Cards render in array order on the Services page; the first six also appear on the home page.

**Replacing the placeholder logos:** drop the official logo into `public/logos/` and point the course's `logo` at it, for example `logo: asset('logos/sat.png')`. Use a transparent PNG or SVG roughly 2:1 in shape; the card scales it to fit.

### Testimonial videos

Edit [`src/data/testimonials.ts`](src/data/testimonials.ts). Add the YouTube video ID (the part after `watch?v=`) to the `testimonialVideoIds` array. Videos are click-to-play, so adding more does not slow the page down.

### Stats and feature cards

Edit [`src/data/stats.ts`](src/data/stats.ts) and [`src/data/features.ts`](src/data/features.ts). Number stats count up when scrolled into view; text stats show as check-marked statements.

### Portrait on the Contact page

The photo is `public/portrait.jpg`; replace the file to update it. Name, title and alt text live in [`src/config.ts`](src/config.ts) under `portrait`. The frame is square, so a square or near-square photo works best.

---

## Adding gallery images

1. Export the photo as JPG or WebP, no wider than about 1600px, and compress it (Squoosh or ImageOptim work well).
2. Copy it into `public/gallery/`.
3. Add an entry to the `gallery` array in [`src/data/gallery.ts`](src/data/gallery.ts):

   ```ts
   {
     id: 'sat-workshop-2026',
     src: asset('gallery/sat-workshop-2026.jpg'),
     alt: 'Students working through SAT math problems at the whiteboard',
     caption: 'SAT workshop',
     width: 1600,
     height: 1067,
   },
   ```

   `width` and `height` are the image's pixel dimensions. They keep the masonry layout stable while photos load; landscape, portrait and square images all work.

4. To remove a photo, delete its entry (and the file). Photos render in array order.

Current photos are small screenshots (about 480px wide). Replacing them with the original full-resolution files at the same paths will sharpen the gallery and lightbox with no code changes.

---

## Contact form

GitHub Pages cannot run server code, so the form posts to a static form service. Configure one with environment variables (locally in `.env.local`, in production as GitHub repository variables — see [Deployment](#deployment)).

**Formspree**

```
VITE_FORM_ENDPOINT=https://formspree.io/f/<your-form-id>
```

**Web3Forms**

```
VITE_FORM_ENDPOINT=https://api.web3forms.com/submit
VITE_WEB3FORMS_KEY=<your-access-key>
```

If no endpoint is configured, the form falls back to opening the visitor's email app with the message pre-filled (a `mailto:` link to the address in `config.ts`). The form includes a honeypot field to deter spam bots, and shows animated success and error states.

Linking to `/contact?course=<slug>` preselects a course in the dropdown; the course card buttons already do this.

---

## Deployment

The site deploys automatically to GitHub Pages from the `main` branch.

### One-time setup

1. Push this folder to a GitHub repository (`main` branch).
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push (or re-run the workflow under **Actions**). The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) installs dependencies, runs `npm run build` and publishes `dist/`.

### Custom domain

`public/CNAME` contains `winstoncollegeprep.net`, so Pages will serve the site there once DNS points at GitHub:

- `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` record for `www` → `<your-github-username>.github.io`

Then, under **Settings → Pages**, confirm the custom domain and tick **Enforce HTTPS**.

### Base path

With the custom domain (or a `<user>.github.io` root repository) the site lives at `/`, which is the default. If you deploy to a project URL such as `https://<user>.github.io/<repo>/` **without** a custom domain, set the repository variable `VITE_BASE_PATH` to `/<repo>/` (**Settings → Secrets and variables → Actions → Variables**). Vite, the router and all asset paths read from it.

### Form service in production

Add `VITE_FORM_ENDPOINT` (and `VITE_WEB3FORMS_KEY` if using Web3Forms) as repository **variables** in the same place. The workflow passes them to the build.

### How client-side routing works on Pages

GitHub Pages only knows about real files, so a hard refresh on `/services` would normally return its 404 page. The build copies `index.html` to `404.html`, so Pages serves the app shell for any unknown path and react-router renders the right page. Deep links and refreshes therefore work everywhere.

---

## Accessibility and motion

- Every animation uses one easing curve and 0.5–0.85s durations (see [`src/lib/variants.ts`](src/lib/variants.ts)). Hover micro-interactions (card lift, feature icons, course logos, magnetic buttons) use a shared spring.
- Design tokens (the navy / royal / sky / ice palette, the accent gradient, grain and dot-grid textures) live in [`src/index.css`](src/index.css) under `@theme` and `@utility`.
- Users with **prefers-reduced-motion** enabled get fades only: transforms, parallax and count-ups are disabled through Framer Motion's `MotionConfig` and `useReducedMotion`.
- Keyboard: skip link, visible focus rings, `Escape` closes the mobile menu and the lightbox, arrow keys move between gallery images.
- YouTube embeds load only when played, using the privacy-enhanced `youtube-nocookie.com` domain.
- Social preview: `public/og-image.png` (1200×630) and `public/apple-touch-icon.png` are rendered from the design; regenerate them if the wordmark changes.
