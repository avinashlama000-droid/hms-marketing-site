# HMS Marketing Website Architecture

## Product Understanding

HMS is a hostel operating system for owners, wardens, accountants, staff, and residents. The real product surface includes students, staff, rooms, check-in/out, income, expenses, salary, payments, suppliers, payment methods, complaints, notices, inquiries, reports, tenants, blocks, and role-based access.

Primary pains:
- Admission leads get lost across calls, chat, and spreadsheets.
- Room availability, dues, complaints, and check-out context are hard to answer quickly.
- Finance work is fragmented across student dues, supplier balances, salary payments, expenses, and income.
- Multi-block or multi-branch operators need scoped control without losing central visibility.

Conversion goal:
- Move visitors into a structured Book Now inquiry that can become a CRM record, admin task, email notification, and eventually a resident onboarding workflow.

## Website Architecture

- Hero: instant value, two CTAs, product visualization, operational proof.
- Product Glimpse: dashboard, admin desk, and student portal framing inspired by the Hajir Khata reference layout while keeping HMS identity distinct.
- Social Proof: client network placeholders, fast setup, all-in-one workflow, local fit.
- About/Product: user, pain, trigger.
- Workflow: contact support, qualify inquiry, convert resident, operate daily.
- Features: inquiry CRM, students, rooms, dues, check-in/out, complaints, suppliers, notifications.
- Benefits: auditability, less operational drift, finance-ready reporting, enterprise posture.
- Use Cases: student hostels, multi-branch operators, staff accommodation, training campuses.
- Comparison: before HMS vs with HMS.
- Trust: tenant scope, permissions, notifications, audit trails.
- Pricing: Starter, Growth, Enterprise inquiry-led packages.
- Testimonials: role-based quotes.
- Book Now: modal inquiry flow and backend integration.
- Contact: phone, email, location.
- FAQ: buyer objections.
- Legal: privacy, terms, security pages.
- SEO: metadata, sitemap, robots.

## Design System

- Typography: heavy, compact SaaS headings; readable body copy; uppercase eyebrow labels for section scanning.
- Color: HMS blue `#235999` and `#1e4d87`, clean white surfaces, soft slate-blue backgrounds, deep ink for enterprise contrast.
- Spacing: `container-grid` with 32px mobile gutters and 56px tablet/desktop gutters; 64-80px section rhythm.
- Radius: 8px UI radius for cards and controls; rounded nav/logo elements where brand expression benefits.
- Buttons: primary blue, secondary white, dark where needed. All buttons include focus states.
- Cards: single-layer cards only, with crisp shadow and border.
- Motion: Framer Motion reveal with reduced-motion support in CSS.
- Iconography: lucide line icons for consistency.
- Accessibility: visible focus ring, high contrast text, native form controls, semantic sections, metadata.

## Inquiry System

Frontend fields:
- organizationName, contactName, email, phone, role, currentSystem
- propertyType, beds, locations, priorities, modules
- timeline, budget, message, consent

Validation:
- Zod schema in `lib/inquiry-schema.ts`
- Required contact, operation, rollout, and consent fields
- Email format, max lengths, at least one priority and module

API:
- `POST /api/inquiries`
- Validates payload
- Adds `source`, `status`, `priority`, `submittedAt`, and `inquiryNumber`
- Forwards to `HMS_INQUIRY_API_URL` with optional `HMS_INQUIRY_API_TOKEN`
- Includes `backendSuggestion` mapped to the existing Laravel inquiry shape: `name`, `email`, `phone`, `seater_type`, `block_id`, `staff_id`, `description`

Recommended database additions:
- `marketing_inquiries`: id, inquiry_number, organization_name, contact_name, email, phone, role, property_type, beds, locations, current_system, timeline, budget, message, consent_at, source, status, priority, owner_id, next_follow_up_at, converted_inquiry_id, converted_student_id, created_at, updated_at
- `marketing_inquiry_modules`: inquiry_id, module_key
- `marketing_inquiry_priorities`: inquiry_id, priority_key
- `marketing_inquiry_events`: inquiry_id, event_type, payload_json, actor_id, created_at
- `marketing_inquiry_notifications`: inquiry_id, channel, recipient, template_key, status, sent_at, error

Recommended status flow:
- new, contacted, follow_up, qualified, converted, closed, lost

## Component Strategy

- `app/page.tsx`: CMS-ready section data and page assembly.
- `components/site-header.tsx`: Hajir-style top contact bar, rounded nav, login, Book Now CTA.
- `components/inquiry-dialog.tsx`: premium multi-step inquiry flow.
- `components/product-visualization.tsx`: lightweight product UI visualization without heavy assets.
- `components/ui/*`: shadcn-style primitives for Button, Input, Select, Textarea.
- `lib/site.ts`: brand/contact/config constants.
- `lib/inquiry-schema.ts`: shared validation and typed payload.

## SEO Strategy

- Homepage targets hostel management software, hostel ERP, room allocation, dues, complaints, and resident operations.
- Legal/security pages build trust for enterprise and institutional buyers.
- `sitemap.ts` and `robots.ts` are included.
- Future CMS-ready content: `/blog`, `/industries/[slug]`, `/features/[slug]`, `/compare/[competitor]`, `/case-studies/[slug]`.

## Scalability Recommendations

- Replace placeholder client names with approved customer logos.
- Add real product screenshots once app UI is production-ready.
- Connect `HMS_INQUIRY_API_URL` to a dedicated backend endpoint instead of the room-specific public booking endpoint.
- Add email templates for new inquiry, sales assignment, admin notification, and requester confirmation.
- Track conversion events: hero CTA, pricing CTA, form step completion, submit success, mail click, phone click.
- Add a CMS for blog, testimonials, pricing copy, FAQ, and industry pages.
