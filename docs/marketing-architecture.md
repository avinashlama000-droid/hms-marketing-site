# HMS Marketing Website Architecture

## Product Understanding

HMS is a hostel management operating system, not a simple booking page. The existing workspace shows modules for inquiries, students, rooms, blocks, payments, monthly fees, check-in/check-out rules, complaints, notices, suppliers, expenses, staff, salary payments, email notifications, reporting, tenant scope, and role-based access.

Primary users:
- Owners need financial control, occupancy visibility, and branch-level reporting.
- Wardens need fast answers about rooms, residents, dues, complaints, and notices.
- Accountants need payment histories, supplier ledgers, salary payments, dues, and reconciliation discipline.
- Staff need permission-aware daily workflows.
- Students and guardians need responsive service, clearer dues, notices, and complaint updates.

Core pain points:
- Admissions live separately from room allocation.
- Dues and payment status are difficult to verify quickly.
- Complaints and notices disappear into informal messaging.
- Staff attendance, payroll, and financial adjustments drift apart.
- Supplier and expense activity is disconnected from operational decisions.
- Multi-branch operators struggle to keep scope, permissions, and reports clean.

Conversion goal:
- Move visitors into a structured "Book Now" inquiry flow that captures implementation requirements and can become an HMS inquiry record with status, source, priority, follow-up, assignment, and conversion tracking.

## Website Structure

1. Hero: positions HMS as "The operating system for modern hostel management" with immediate CTAs and a product-style dashboard visualization.
2. Product clarity: explains the real audience, pain, and operational trigger.
3. Workflow: maps inquiry to qualified lead, converted student, and ongoing operations.
4. Modules: shows the real system breadth without making the page feel like a generic feature grid.
5. Benefits: converts by selling control, auditability, and reduced drift.
6. Use cases: student hostel, multi-branch operator, staff accommodation, training campus.
7. Comparison: before HMS versus with HMS.
8. Trust: tenant scope, permissions, notifications, auditability.
9. Testimonials: role-based proof placeholders.
10. Book Now: structured inquiry CTA and backend integration explanation.
11. FAQ: closes implementation and product-fit objections.
12. Footer and legal pages: privacy, terms, security.

## Design System

Typography:
- System font stack for performance and deployment reliability.
- Hero: 56-72px desktop, 48px mobile, black weight.
- Section headings: 36-48px.
- Body: 16-18px with 1.6-1.75 line height.
- UI labels: 12-14px, bold, uppercase only for short system labels.

Spacing:
- Container: `min(100% - 32px, 1180px)` mobile, `min(100% - 56px, 1180px)` tablet+.
- Section padding: 64px mobile, 80px desktop.
- Component gaps: 8px, 12px, 16px, 24px, 40px.

Grid:
- Mobile-first single column.
- Module grid: 1 column mobile, 2 tablet, 4 desktop.
- Workflow: 1 column mobile, 4 desktop.
- Hero: full-bleed product visualization behind copy.

Color:
- 60 percent neutral foundation: `#F6F8FB`, white, and slate ink neutrals `#0F172A`, `#1E293B`, `#64748B`.
- 30 percent HMS blue system color: primary blue `#235999`, hover blue `#1e4d87`, and dark blue `#183e6b`.
- 10 percent operational signals: amber `#d89022`, coral `#da6255`, and mint `#42b892` only for warnings, errors, and positive status.
- No non-HMS cool accent token is used in the HMS marketing design system.
- Contrast: body text uses ink colors on white or near-white backgrounds, and white/ink-200 on ink-900 dark sections.

Components:
- Button variants: primary, secondary, dark, ghost.
- Inputs, selects, textarea with consistent border, focus ring, radius, and height.
- Cards use 8px radius, 1px border, restrained shadows.
- Motion uses Framer Motion reveal transitions with reduced-motion support.
- Hover states shift color and shadow subtly.
- Loading states use an inline spinner in the inquiry submit button.
- Empty/success state appears after inquiry submission.

Accessibility:
- Keyboard-focus rings on controls.
- Dialog uses `role="dialog"` and `aria-modal`.
- Buttons have clear labels.
- Color is never the only signal in form validation.
- Reduced-motion preference is respected.

## Component Hierarchy

- `app/layout.tsx`: metadata, viewport, global shell.
- `app/page.tsx`: section composition and typed content arrays.
- `components/site-header.tsx`: navigation and Book Now trigger.
- `components/product-visualization.tsx`: product-specific dashboard scene.
- `components/inquiry-dialog.tsx`: multi-step inquiry flow.
- `components/site-footer.tsx`: footer and legal navigation.
- `components/ui/*`: shadcn-style reusable primitives.
- `lib/inquiry-schema.ts`: shared validation and field options.
- `app/api/inquiries/route.ts`: typed backend integration route.

## SEO Strategy

- Primary intent: hostel management software, student hostel ERP, hostel dues management, room allocation software.
- Metadata is configured in `app/layout.tsx`.
- Page copy uses concrete product language tied to real modules.
- Legal/security pages create trust and support enterprise evaluation.
- Future CMS collections should include use cases, implementation articles, product pages by module, customer stories, and comparison pages.

## Scalability Recommendations

- Move section arrays into a CMS adapter when content owners need editing.
- Add real product screenshots once the admin UI is stable.
- Add analytics events for hero CTA, Book Now step completion, module clicks, FAQ opens, and successful inquiry.
- Add server-side CRM forwarding to the Laravel HMS inquiry module.
- Add email notification templates for marketing inquiries, sales assignment, and visitor confirmation.
- Add a pricing configurator once packaging is finalized.
