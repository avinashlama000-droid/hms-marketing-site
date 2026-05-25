# Book Now Inquiry System

## UX Flow

Step 1: Contact
- Organization name
- Contact name
- Email
- Phone
- Role
- Current system

Step 2: Operation
- Property type
- Bed range
- Location count
- Operational priorities
- Modules to evaluate

Step 3: Rollout
- Timeline
- Budget range
- Notes
- Consent

Validation:
- Required identity fields.
- Valid email.
- Phone length guard.
- At least one priority.
- At least one module.
- Timeline, budget, and consent required.
- Message capped at 1200 characters.

## Frontend API

Route:

```txt
POST /api/inquiries
```

Environment variables:

```txt
HMS_INQUIRY_API_URL=https://your-hms-api.example.com/api/inquiries
HMS_INQUIRY_API_TOKEN=server-side-token
```

The route validates with Zod, adds:

```json
{
  "source": "marketing_website",
  "status": "new",
  "priority": "normal | high",
  "submittedAt": "ISO timestamp"
}
```

Then it forwards to the configured HMS endpoint. If no endpoint is configured, it returns `202` so the UI can be tested during frontend development.

## Backend Mapping

Existing HMS inquiry fields:
- `name`
- `email`
- `phone`
- `seater_type`
- `block_id`
- `staff_id`
- `description`
- `status`
- `source`
- `priority`
- `assigned_to`
- `follow_up_at`
- `converted_student_id`
- `converted_at`

Recommended marketing inquiry adapter:
- `organizationName` maps to description metadata or a new `organization_name` column.
- `contactName` maps to `name`.
- `propertyType`, `beds`, `locations`, `currentSystem`, `priorities`, `modules`, `timeline`, `budget`, and `message` should be stored as structured JSON in `requirements`.
- `source` should be `marketing_website`.
- `status` should start as `new`.
- `priority` should become `high` when the selected timeline is immediate.

## Database Schema Suggestion

For a production-grade marketing CRM layer, add a dedicated table or extend inquiries:

```sql
create table marketing_inquiries (
  id bigserial primary key,
  inquiry_id bigint null references inquiries(id),
  inquiry_number varchar(40) unique,
  organization_name varchar(120) not null,
  contact_name varchar(100) not null,
  email varchar(160) not null,
  phone varchar(32) not null,
  role varchar(80) not null,
  property_type varchar(40) not null,
  beds varchar(40) not null,
  locations varchar(40) not null,
  current_system varchar(160) null,
  priorities jsonb not null,
  modules jsonb not null,
  timeline varchar(60) not null,
  budget varchar(60) not null,
  message text null,
  source varchar(80) not null default 'marketing_website',
  status varchar(40) not null default 'new',
  priority varchar(20) not null default 'normal',
  assigned_to bigint null,
  follow_up_at timestamp null,
  converted_student_id bigint null,
  converted_at timestamp null,
  crm_external_id varchar(120) null,
  notification_status varchar(40) not null default 'pending',
  created_at timestamp not null,
  updated_at timestamp not null,
  deleted_at timestamp null
);
```

Recommended indexes:

```sql
create index marketing_inquiries_status_index on marketing_inquiries(status);
create index marketing_inquiries_source_index on marketing_inquiries(source);
create index marketing_inquiries_priority_index on marketing_inquiries(priority);
create index marketing_inquiries_follow_up_at_index on marketing_inquiries(follow_up_at);
create index marketing_inquiries_email_index on marketing_inquiries(lower(email));
create index marketing_inquiries_phone_index on marketing_inquiries(phone);
```

## Automation Hooks

Email notifications:
- Visitor confirmation.
- Sales/admin alert.
- Assignment changed.
- Follow-up due.
- Inquiry converted.

CRM integration:
- Create or update lead.
- Sync owner.
- Sync status.
- Write notes and module interest.
- Store external CRM ID.

Admin dashboard:
- New marketing inquiries count.
- Urgent inquiries.
- Follow-ups due today.
- Conversion rate by source.
- Most requested modules.
- Bed range and location demand.

Status tracking:
- `new`
- `contacted`
- `follow_up`
- `qualified`
- `converted`
- `closed`
- `lost`
