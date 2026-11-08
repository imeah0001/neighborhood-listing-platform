
-- CIS 3610 Midterm Practical Examination - Version B
-- Local Merchant Services and Appointment Booking
-- Apply only to an approved development Supabase database.
-- This migration has not yet been executed or verified.

BEGIN;

-- 1. User profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL
    CHECK (role IN ('admin', 'merchant', 'provider', 'client')),
  created_at TIMESTAMPTZ NOT NULL
    DEFAULT timezone('utc'::text, now())
);

-- 2. Service categories
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) >= 3),
  slug TEXT NOT NULL UNIQUE
    CHECK (slug ~* '^[a-z0-9-]+$'),
  active_status BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL
    DEFAULT timezone('utc'::text, now())
);

-- 3. Merchant services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL
    REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title TEXT NOT NULL CHECK (char_length(title) >= 5),
  hourly_rate NUMERIC(10,2) NOT NULL
    CHECK (hourly_rate >= 0),
  duration_minutes INTEGER NOT NULL
    CHECK (duration_minutes >= 15),
  coverage_radius_miles INTEGER NOT NULL
    CHECK (coverage_radius_miles > 0),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending', 'approved', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL
    DEFAULT timezone('utc'::text, now())
);

-- 4. Service-category relationships
CREATE TABLE public.service_category_mappings (
  service_id UUID NOT NULL
    REFERENCES public.services(id) ON DELETE CASCADE,
  category_id UUID NOT NULL
    REFERENCES public.service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

-- 5. Appointment bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL
    REFERENCES public.services(id) ON DELETE CASCADE,
  client_email TEXT NOT NULL
    CHECK (
      client_email ~*
      '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$'
    ),
  requested_date DATE NOT NULL,
  notes TEXT NOT NULL CHECK (char_length(notes) >= 10),
  created_at TIMESTAMPTZ NOT NULL
    DEFAULT timezone('utc'::text, now())
);

-- Helpful indexes
CREATE INDEX services_provider_idx
  ON public.services(provider_id);

CREATE INDEX services_status_idx
  ON public.services(status);

CREATE INDEX bookings_service_idx
  ON public.bookings(service_id);

CREATE INDEX mappings_category_idx
  ON public.service_category_mappings(category_id);

-- Enable row-level security on every table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Explicit API permissions. RLS policies restrict these grants.
GRANT SELECT ON public.profiles TO authenticated;

GRANT SELECT ON public.service_categories
  TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.services
  TO authenticated;

GRANT SELECT ON public.services TO anon;

GRANT SELECT ON public.service_category_mappings
  TO anon, authenticated;

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT ON public.bookings TO authenticated;

-- Users can read only their own profile.
-- Role assignment is handled by trusted server code.
CREATE POLICY profiles_read_own
ON public.profiles FOR SELECT
TO authenticated
USING (id = (SELECT auth.uid()));

-- Public visitors see only active categories.
CREATE POLICY categories_read_active
ON public.service_categories FOR SELECT
TO anon, authenticated
USING (active_status = TRUE);

-- Public visitors see approved services only.
CREATE POLICY services_read_approved
ON public.services FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Providers can also read their own services.
CREATE POLICY services_read_own
ON public.services FOR SELECT
TO authenticated
USING (provider_id = (SELECT auth.uid()));

-- Providers may create only their own draft services.
CREATE POLICY services_insert_own_draft
ON public.services FOR INSERT
TO authenticated
WITH CHECK (
  provider_id = (SELECT auth.uid())
  AND status = 'draft'
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = (SELECT auth.uid())
      AND p.role IN ('merchant', 'provider')
  )
);

-- Providers can update only their own non-live services.
CREATE POLICY services_update_own_unapproved
ON public.services FOR UPDATE
TO authenticated
USING (
  provider_id = (SELECT auth.uid())
  AND status IN ('draft', 'suspended')
)
WITH CHECK (
  provider_id = (SELECT auth.uid())
  AND status IN ('draft', 'suspended')
);

-- Providers can delete only their own non-live services.
CREATE POLICY services_delete_own_unapproved
ON public.services FOR DELETE
TO authenticated
USING (
  provider_id = (SELECT auth.uid())
  AND status IN ('draft', 'suspended')
);

-- Public users can see mappings for approved services.
CREATE POLICY mappings_read_approved
ON public.service_category_mappings FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.services s
    WHERE s.id = service_id
      AND s.status = 'approved'
  )
);

-- Visitors may request bookings for approved services.
-- Booking data is not publicly readable.
CREATE POLICY bookings_insert_approved_service
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.services s
    WHERE s.id = service_id
      AND s.status = 'approved'
  )
);

-- Only a service provider can read related bookings.
-- Administrators use trusted server-side authorization.
CREATE POLICY bookings_provider_read
ON public.bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.services s
    WHERE s.id = bookings.service_id
      AND s.provider_id = (SELECT auth.uid())
  )
);

COMMIT;
