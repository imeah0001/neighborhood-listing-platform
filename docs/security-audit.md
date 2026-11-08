# Midterm Security Audit — Local Services and Bookings

## Security Controls
- PostgreSQL Row-Level Security (RLS) is enabled on all five exam tables: profiles, service_categories, services, service_category_mappings, and bookings.
- Ten RLS policies were inspected in the Supabase SQL Editor.
- Application API credentials are stored in .env.local, which is excluded from Git.
- Public service discovery returns approved listings only.

## Authorization Test Matrix

| Role | Test | Expected Result | Observed Result | Status |
|---|---|---|---|---|
| Anonymous | Read approved service | Allowed | Approved home-cleaning listing returned through the API and displayed on the website | PASS |
| Anonymous | Read draft service | Denied/hidden | Specific draft-isolation test not yet recorded | NOT TESTED |
| Provider A | Update own draft service | Allowed | Authenticated update test not yet recorded | NOT TESTED |
| Provider A | Update Provider B's service | Denied | Cross-provider update test not yet recorded | NOT TESTED |
| Authenticated provider | Insert a listing using another provider's ID | Denied | Supabase returned SQLSTATE 42501, RLS policy violation | PASS |
| Public client | Submit a booking | Allowed | Website showed success; matching record verified in public.bookings | PASS |
| Public client | Read another client's bookings | Denied | Direct booking SELECT test not yet recorded | NOT TESTED |
| Administrator | Read/write records using elevated access | Allowed | Records created and edited through Supabase Table Editor as postgres; service-role-specific test not performed | PARTIAL |

## End-to-End Evidence
1. GET /api/services returned an empty service list before test data existed.
2. An approved test service appeared on the production-mode local website.
3. A booking for November 10, 2026 was submitted from the website.
4. The booking was confirmed in the Supabase bookings table.
5. GitHub Actions ESLint and application build completed successfully.

## Remaining Verification
- Test draft visibility using the anonymous API.
- Test provider-owned versus cross-provider updates.
- Test unauthorized booking reads.
- Verify administrator access using the intended service execution role.

## Limitations
Supabase Table Editor operations performed as postgres demonstrate elevated database access, not the application's administrator authorization flow. Untested scenarios must not be represented as passing.
