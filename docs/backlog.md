# Backlog — Tễu Tạc FE

_Last updated: 2026-08-10_

## Business scope (confirmed)

Guest-only storefront, no accounts/admin. Thanh toán **chỉ qua VietQR/PayOS, không COD**. Xác nhận thanh toán (webhook), email, và sổ sách kế toán (file Excel) do một **repo backend Node.js riêng** đảm nhiệm — xem `docs/specs/backend-payos-handoff.md`. **Auth và User account bị loại khỏi phạm vi** theo quyết định nghiệp vụ này; các stub file (`src/features/auth/`, `src/features/user/`) giữ nguyên rỗng, không phát triển tiếp trừ khi có quyết định mới.

## Roadmap (MVP)
- [x] Shared layout (Navbar, Footer)
- [x] Home page
- [x] Shop (product list)
- [x] Product detail
- [x] Cart (shipping-info step)
- [x] Checkout payment page (`/checkout/:orderId`) — VietQR display + polling, mock backend
- [ ] Real backend integration (PayOS webhook, email, Excel) — separate Node.js repo, spec ready
- [x] ~~Auth (login/register)~~ — out of scope (confirmed)
- [x] ~~User account (profile, order history)~~ — out of scope (confirmed)

All 4 Stitch designs are converted. Remaining FE-owned work is swapping the checkout mock for the real backend once it exists.

## Tasks

| Feature | Task | Status | Notes |
|---|---|---|---|
| config | Tailwind v4 + design tokens + path alias | done | `src/index.css`, `vite.config.ts`, `tsconfig.app.json` |
| layout | Navbar + Footer shared components | done | `src/components/layout/`, wired via `App.tsx`. Navbar cart icon shows a live item-count badge |
| common | `Icon` component (Material Symbols wrapper) | done | `src/components/common/Icon.tsx` |
| common | `Button` component | todo | Still an empty stub (`src/components/common/Button/Button.tsx`) — no page has needed a generic button yet (CTAs so far are `Link`s) |
| forms | `FormInput` / `FormSelect` / `FormCheckbox` (Formik-typed) | done | |
| home | HomePage sections (Hero/About/Products/Workshop/News/Gallery) | done | `src/features/home/`, route `/` |
| products | Types + mock `productApi` + `productSlice` | done | `getProducts`/`fetchProducts`; `story`/`badges` optional fields (only `teu-long` has real content, others fall back to `description`) |
| products | Shared `ProductCard` | done | `variant="compact"` (Home), `"detailed"` (Shop), `"related"` (Product detail) |
| products | `ProductListPage` (Shop) | done | Route `/products`. Category filter functional. Sort-by-price select now functional (replaced the decorative "Giá"/"Combo" buttons — "Combo" removed entirely since there's no combo product data model) |
| products | `ProductDetailPage` | done | Route `/products/:slug` |
| cart | `CartItem` type + `cartSlice` (add/remove/inc/dec/clear) | done | `src/features/cart/` |
| cart | `CartPage` (shipping-info step) | done | Route `/cart`. On submit: dispatches `checkout/createOrder`, clears cart, navigates to `/checkout/:orderId`. No more instant fake "order placed" — that state now belongs to the checkout payment step |
| cart | Voucher input | todo | Still decorative — no promo/discount rule exists. Deliberately left as-is per current scope (nice-to-have, not blocking) |
| cart | Vietnam province/district/ward cascading select | todo | Collapsed into a single "Địa chỉ cụ thể" free-text field — needs a real VN administrative-division dataset before building proper cascading selects |
| checkout | Types + mock `checkoutApi` (`createOrder`/`getOrderStatus`) + `checkoutSlice` | done | `src/features/checkout/`. In-memory mock only — order state is lost on page reload, a known gap the real backend must fix via `GET /orders/:orderId` (documented in the handoff spec) |
| checkout | `CheckoutPage` (VietQR payment step) | done | Route `/checkout/:orderId`. Shows order summary, honest QR placeholder (no fake QR image), polls status every 5s, handles paid/expired/failed/not-found states |
| checkout | Real PayOS-backed backend | todo | **Owned by a separate Node.js repo**, not this one. Full contract in `docs/specs/backend-payos-handoff.md`: order API, PayOS integration, webhook verification, email (customer + admin), Excel bookkeeping. Once it exists, only `src/features/checkout/services/checkoutApi.ts` needs to change (swap mock for `axiosClient` calls) |
| auth | Login/Register | out of scope | Confirmed: guest checkout only, no accounts |
| user | Profile / Order history | out of scope | Confirmed: no accounts, no admin page |
| store | `rootReducer.ts` + `store/index.ts` wiring | done | `products` + `cart` + `checkout` reducers registered |
| routes | `AppRoutes.tsx` | done (for MVP scope) | `/`, `/products`, `/products/:slug`, `/cart`, `/checkout/:orderId` registered |

## Next up
1. **Build the backend repo** using `docs/specs/backend-payos-handoff.md` — PayOS order creation, webhook verification, email (customer + admin), Excel bookkeeping. This is a separate Node.js repo, not this one.
2. Once the backend is live: swap `src/features/checkout/services/checkoutApi.ts`'s two mock functions for real `axiosClient` calls, and add the `GET /orders/:orderId` call on `CheckoutPage` mount so refreshing the payment page doesn't lose order state.
3. Nice-to-haves, not blocking: voucher/discount logic, VN address cascading selects, multi-image product gallery, generic `Button` component.
