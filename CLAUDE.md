# Project Guidelines & Architecture for Claude Code (TypeScript)

## 1. Project Overview & Tech Stack

- **Type**: E-commerce Web Application (SPA) — "Tễu Tạc", bán mô hình DIY lấy cảm hứng từ múa rối nước Việt Nam.
- **Business scope (confirmed)**: Guest-only storefront — no login/register, no user profile/order history, no admin page in this repo. Flow is browse -> cart -> shipping info -> pay via VietQR (PayOS) -> confirmation. **No COD.** Payment confirmation (webhook), email notifications, and accounting records (Excel file) are all owned by a **separate Node.js backend repo** — see `docs/specs/backend-payos-handoff.md` for its contract. This FE repo never talks to PayOS directly; it only calls this backend's REST API.
- **Language**: TypeScript (`.ts`, `.tsx`) - STRICT TYPE CHECKING.
- **Framework**: ReactJS (Vite) - NO Next.js, NO SSR.
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Form & Validation**: `formik` + `yup`
- **Routing**: `react-router-dom` (v6+)
- **HTTP Client**: `axios` (configured at `@/config/axiosClient.ts`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`). NO SCSS/Sass, NO CSS Modules.
- **Icons**: Material Symbols Outlined (Google Fonts, loaded in `index.html`). NOT `lucide-react`.
- **Path Alias**: Use `@/` for `src/` directory. Configured in `vite.config.ts` (`resolve.alias`) and `tsconfig.app.json` (`compilerOptions.paths`).

## 2. Design System — Single Source of Truth

- The entire visual language ("Imperial Heritage Modern") is defined **once** in `Stich-Design/DESIGN.md`. All 4 page folders (`HomePage`, `ShopPage`, `ProductDetail`, `Cart`) share the exact same tokens — there is no per-page style variation.
- These tokens are already implemented as Tailwind v4 `@theme` variables in `src/index.css` (colors, `font-*`/`text-*` type scale, `--radius-*`, named spacing, `--container-max`). **Never invent new colors, font sizes, or spacing values** — reuse the existing token names (`bg-primary`, `text-headline-lg`, `px-gutter`, `max-w-container-max`, etc.).
- If a new token is genuinely needed (rare), add it to `src/index.css` `@theme` first, matching the naming style already used, then use it — don't hardcode hex/px values in components.
- Custom recurring classes already available: `.ghost-border` (1px gold outline), `.gold-gradient-divider` (shimmering divider), `.material-symbols-outlined` (icon font).

## 3. `Stich-Design/` Is Reference Only — Never Ship It As-Is

`Stich-Design/<Page>/code.html` is a static Tailwind mockup exported from Stitch. It is **input for conversion**, not production code. When turning a page into real React:

1. Read `code.html` + `DESIGN.md` (tokens already ported, just for context) + `screen.png` (visual reference) for that page.
2. Because the Tailwind theme mirrors Stitch 1:1, layout/utility classes can largely be reused verbatim — the conversion work is about **structure**, not re-styling.
3. Identify what is shared across pages (nav bar, footer) vs. page-specific — see §5 to avoid duplicating shared UI.
4. Replace every hardcoded string that is business data (product name, price, dates, stock…) with a typed value coming from `types/` + `services/` (mock data first, real API later). Static microcopy (button labels, section titles, form placeholders) can stay as literal Vietnamese strings.
5. Replace Stitch's hotlinked `lh3.googleusercontent.com` image URLs with a local placeholder asset or the entity's real image field — never ship a Google-hosted mockup URL to production.
6. Icons stay as `<span class="material-symbols-outlined">icon_name</span>` — reuse the shared `Icon` component (see §5) instead of repeating the span everywhere.
7. Build (`npm run build`) must pass before considering a converted page done.

For a repeatable, detailed conversion checklist, use the `stitch-convert` skill (`.claude/skills/stitch-convert/`).

## 4. Strict Architecture & Folder Rules

Do NOT modify or introduce new root-level folders. Always follow this Feature-First structure:

- `src/types/`: Global TypeScript interfaces/types (e.g., `user.types.ts`, `product.types.ts`, `api.types.ts`).
- `src/features/<feature_name>/`: Domain-driven logic.
  - `types/`: Feature-specific interfaces (or import from `@/types`).
  - `<feature>Slice.ts`: Redux toolkit slice with typed state & actions (camelCase filename, e.g. `cartSlice.ts` — not `CartSLice.ts`).
  - `services/`: API functions for this feature (e.g., `productApi.ts`).
  - `components/`: UI components used ONLY within this feature (`.tsx`).
  - `<Feature>Page.tsx`: Page-level components.
- `src/components/`: Purely presentation/dumb components (`.tsx`), used by 2+ features or app-wide.
  - `common/` — generic building blocks (`Button`, `Icon`, `Card`…). `Icon.tsx` wraps the `material-symbols-outlined` span pattern so callers write `<Icon name="shopping_cart" />` instead of raw spans.
  - `forms/` (Formik typed inputs)
  - `layout/` — **`Navbar.tsx` and `Footer.tsx` live here.** Every Stitch page reuses the identical TopNavBar/Footer — implement them once in `layout/`, import into every feature page. Never re-create nav/footer markup inside a feature folder.
- `src/config/`: App configuration (`axiosClient.ts`, `constants.ts`).
- `src/store/`: Redux store setup. `rootReducer.ts` combines all feature slices; `index.ts` calls `configureStore({ reducer: rootReducer })`.
- `src/hooks/`: Typed custom hooks (`useAppDispatch.ts`, `useAppSelector.ts`, `useDebounce.ts`).
- `src/routes/`: Typed route definitions (`AppRoutes.tsx`, `PrivateRoute.tsx`, `AdminRoute.tsx`).
- `src/utils/`: Pure utility functions with strict parameter types (`formatCurrency.ts`, `formatDate.ts`, `validators.ts`).

### Feature ↔ Page ↔ Route Map

This is the authoritative mapping from the 4 Stitch designs (plus already-scaffolded features) to code. Do not create new top-level features beyond this list without updating this table first.

| Stitch design | Feature | Page component | Route | Notes |
|---|---|---|---|---|
| `HomePage/` | `home` (new) | `src/features/home/HomePage.tsx` | `/` | Static/marketing sections (Hero, About, Workshop form, News, Gallery) live as page-local components in `features/home/components/`. The "Bộ sưu tập" product preview section pulls real data via the `products` feature's service, not hardcoded cards — don't duplicate product-card markup, reuse a shared `ProductCard` (see below). |
| `ShopPage/` | `products` | `src/features/products/ProductListPage.tsx` | `/products` | Filter bar + grid. |
| `ProductDetail/` | `products` | `src/features/products/ProductDetailPage.tsx` | `/products/:slug` | Gallery, story, assembly guide, related products. |
| `Cart/` | `cart` | `src/features/cart/CartPage.tsx` | `/cart` | The Stitch Cart page bundles item list + shipping-info form + notes + order summary + "Xác nhận đặt hàng" CTA in one screen — there is no separate Stitch checkout screen. Treat `CartPage` as the shipping-info step, but the actual order-submission logic (validation, `createOrder` thunk, order status) belongs in the `checkout` feature's slice/service. `CartPage` dispatches into `checkout`, it does not own order logic itself. |
| _(none — see spec)_ | `checkout` | `src/features/checkout/CheckoutPage.tsx` | `/checkout/:orderId` | Payment step after Cart submit: creates a pending order via `checkoutApi` (mock now, real backend later), shows the VietQR code returned by the backend, and polls order status until paid/expired. Business rules in `docs/specs/checkout-payos.md`. |

**Out of scope for this repo (confirmed business decision):** `auth` (login/register) and `user` (profile/order history) — storefront is guest-only, no accounts. The empty stub files under `src/features/auth/` and `src/features/user/` are dead scope; leave them as-is, do not build them out unless the business decision changes. There is likewise no admin feature/page — accounting visibility is handled by the backend writing confirmed orders to an Excel file, not a web UI.

A shared `ProductCard` component (used by Home's collection preview, Shop's grid, and ProductDetail's "related products") belongs in `src/features/products/components/ProductCard.tsx` and should be imported wherever a product tile is needed — never re-implement the card markup per page.

## 5. TypeScript & Coding Standards

- **File Extensions**: Use `.tsx` for React components and `.ts` for pure logic/APIs/slices/types. NEVER create `.js` or `.jsx` files.
- **Type Definitions**:
  - NEVER use `any`. Always define explicit interfaces/types or use `unknown` if needed.
  - Define prop types using `interface Props` or `type Props` for every component.
  - Explicitly type Redux `RootState` and `AppDispatch`.
- **Component Style**: Functional Components using `React.FC<Props>` or direct typed props.
- **State Boundaries**:
  - Global state -> Typed Redux Toolkit Slices.
  - Local form state -> `formik` with typed initial values.
  - Simple UI state -> Standard `useState<T>()`.
- **API Calls**:
  - Define API request & response types in `services/` or `types/`.
  - Use typed `axiosClient` instance. Async Redux actions must use typed `createAsyncThunk`.
- **Imports**: Always use Path Alias `@/` instead of relative paths (`../../`).
- **Styling**: Tailwind utility classes directly in JSX, using the token names from §2. No inline `style={{...}}` for anything covered by a token (color, spacing, radius, font).

## 6. Commands

- Dev Server: `npm run dev`
- Build / Type Check: `npm run build` (runs `tsc -b && vite build`)
- Lint: `npm run lint`

## 7. Workflow Instructions for Claude

- Always generate TypeScript code (`.ts` / `.tsx`) with complete interfaces.
- Before generating code for a feature, check existing types in `src/types/` or `src/features/<feature>/types/`, and check the Feature ↔ Page ↔ Route Map above so you don't create a duplicate feature or page.
- Do NOT delete or restructure existing files unless explicitly requested.
- When building a new page from a Stitch design, follow this order: **BA spec (if business rules are unclear) -> Types -> Service (mock first) -> Slice -> Shared components check (§4 table) -> Feature components -> Page -> Route**.
- When building anything without a Stitch design or a clear spec, run the `ba` skill first instead of improvising business rules. Auth and user account are explicitly out of scope (see §4) — don't resurrect them without a new business decision.
- Payment is VietQR via PayOS, handled entirely by the separate Node.js backend repo; never add a COD option, never call PayOS directly from this FE, and never build an admin/accounting page — that's the Excel file the backend writes.
- Use the `pm` skill to check/update project status before starting a work session, and after finishing one.

## 8. Project Management Skills

Three project-scoped skills live in `.claude/skills/` to support solo vibe-coding on this repo:

- **`ba`** — turns a vague feature request or a Stitch page into a written spec (`docs/specs/<feature>.md`): user flow, business rules, data model draft, API shape, acceptance criteria. Run before coding anything with unclear business logic.
- **`pm`** — maintains `docs/backlog.md`: roadmap, task status, "what's next" — grounded in the actual state of the code, not assumptions.
- **`stitch-convert`** — the detailed, repeatable checklist for turning a `Stich-Design/<Page>` folder into feature-first TSX following §3/§4 above.
