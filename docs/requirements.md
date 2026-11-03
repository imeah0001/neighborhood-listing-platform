# Midterm Practical Examination — Product Requirements

**Project:** Neighborhood Listing Platform
**Subsystem:** Local Merchant Services & Client Appointment Booking
**Branch:** `exam/services-booking-eval`
**Student:** Ihsan Meah

## Story 1 — Merchant Service Listing

**User Story:** As an authenticated local service provider, I want to submit service listing drafts with hourly rates so that clients can book appointments once administrators approve the offerings.

**Scope Estimate:** Medium

### Acceptance Criteria
- **Given** an authenticated merchant or provider with a valid profile,
- **When** the merchant submits a valid service offering containing a title, hourly rate, duration, and coverage radius,
- **Then** the system creates a service linked to the authenticated provider's user ID and assigns `status = 'draft'`.

- **Given** a service submission with missing, invalid, or unexpected fields,
- **When** the POST endpoint validates the payload,
- **Then** it returns HTTP 400 with structured validation errors and does not create a service.

- **Given** a provider who does not own a service,
- **When** that provider attempts to change another provider's service,
- **Then** database authorization denies the modification.

**Traceability (planned implementation):**
- Database: `supabase/migrations/20261029140000_exam_services_persistence.sql` — `profiles`, `services`
- Validation: `src/schemas/service.ts`
- API: `src/app/api/services/route.ts` — POST
- Security: `docs/security-audit.md`

## Story 2 — Resident Service Discovery and Booking

**User Story:** As a neighborhood resident, I want to browse approved local services by neighborhood area and request an appointment without seeing other clients' bookings or contact information.

**Scope Estimate:** Large

### Acceptance Criteria
- **Given** an anonymous visitor,
- **When** the visitor requests the public services list,
- **Then** only approved services are returned, with public fields such as title, hourly rate, duration, and coverage radius.

- **Given** an available approved service,
- **When** a visitor submits a valid appointment request,
- **Then** the system stores the booking without making its contact details publicly readable.

- **Given** an anonymous visitor or an unrelated authenticated user,
- **When** they attempt to read another client's booking,
- **Then** row-level security prevents access to that booking.

**Traceability (planned implementation):**
- Database: `supabase/migrations/20261029140000_exam_services_persistence.sql` — `services`, `service_categories`, `service_category_mappings`, `bookings`
- API: `src/app/api/services/route.ts` — GET
- Booking submission route: To be implemented
- UI: `src/components/ServiceCard.tsx`
- Security: `docs/security-audit.md`
- **Open requirement:** Neighborhood district and active coverage-zone filtering require additional schema design; the specified initial schema contains a coverage radius but no district/coverage-zone table. Do not claim district filtering is implemented until verified.

## Story 3 — Administrator Oversight

**User Story:** As a platform administrator, I want to approve service listings, suspend abusive providers, and audit client bookings so that the marketplace stays safe and trustworthy.

**Scope Estimate:** Large

### Acceptance Criteria
- **Given** a verified administrator using authorized server-side functionality,
- **When** the administrator approves a pending service,
- **Then** the service status changes to `approved` and it becomes eligible for public discovery.

- **Given** a regular provider without administrator privileges,
- **When** that provider attempts to approve their own listing or access all bookings,
- **Then** the operation is denied.

- **Given** an authorized administrator,
- **When** the administrator reviews booking records for an audit,
- **Then** the server retrieves only the information necessary for that authorized operation.

**Traceability (planned implementation):**
- Database: `supabase/migrations/20261029140000_exam_services_persistence.sql` — `profiles`, `services`, `bookings`
- Administrative route: To be implemented with server-side authorization
- Security: `docs/security-audit.md`

## Implementation and Verification Status

These stories define the intended behavior and acceptance criteria. The referenced migration, API routes, UI component, and security audit are planned deliverables unless separately implemented, tested, and committed. Do not treat these specifications as evidence of completed functionality.

## AI Collaboration Note

ChatGPT assisted with organizing the three user stories, acceptance criteria, scope estimates, and planned traceability. Implementation results and test outcomes must be independently verified and recorded in `docs/ai-log.md`.
