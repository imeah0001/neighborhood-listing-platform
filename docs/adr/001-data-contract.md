# ADR 001: Strict Data Contracts for Property Listings

Date: October 25, 2026
Status: Accepted

## Context

The Neighborhood Listing Platform needs reliable data for
properties, local sponsors, and their relationships.

AI-generated JSON may look correct but still contain incorrect
types, missing fields, or unexpected values.

## Decision

Use JSON Schema Draft 2020-12 with Ajv for runtime validation.

Maintain three contracts:

1. Property: listing details, prices, amenities, image metadata,
   and local sponsor IDs.
2. Sponsor: sponsor identity, name, headline, image metadata,
   and website URL.
3. PropertySponsor: a relationship containing property_id
   and sponsor_id.

Keep Property and Sponsor as separate entities rather than
embedding complete sponsor records inside each property.

## Validation Rules

- Reject missing required fields and unexpected properties.
- Require nonnegative prices and property measurements.
- Require five-digit ZIP codes and two-letter state codes.
- Restrict property types and amenities to approved values.
- Reject duplicate amenities and duplicate sponsor IDs.
- Validate JSON records at runtime before rendering them.
- Check property-to-sponsor references against known records
  separately from JSON Schema validation.

## Relationship Design

A property can reference multiple local sponsors, and a sponsor
can be associated with multiple properties.

The PropertySponsor contract represents this many-to-many
relationship using IDs instead of duplicating sponsor details.

The generated listing format also includes local_sponsors,
an array of sponsor IDs.

## AI Collaboration and Verification

Google AI Studio generated five fictional property listings.

ChatGPT assisted with designing schemas, writing validation
tests, and connecting validated records to the Next.js UI.

The generated records were not accepted on appearance alone:
all five passed Ajv validation, and seven automated tests
passed for the generated dataset.

## Alternatives Considered

Embedding sponsor details directly inside each property was
rejected because it duplicates data and complicates updates.

Relying only on TypeScript interfaces was rejected because
TypeScript does not validate external JSON at runtime.

## Consequences

Benefits:
- Invalid property records can be rejected before rendering.
- Property types match the website's search filters.
- Contracts can be tested independently.
- Sponsor relationships are represented explicitly.

Tradeoffs:
- Validation requires additional code and dependencies.
- JSON Schema checks URL syntax, not whether links work.
- Relationship integrity requires checks beyond JSON Schema.
- Fictional listing links and images need clear placeholders.

## Verification

- Property schema compiled successfully with Ajv.
- Sponsor schema compiled successfully with Ajv.
- PropertySponsor schema compiled successfully with Ajv.
- Five property-validation tests passed.
- Seven generated-property tests passed.
- Next.js lint and production build passed.
- House filter displayed the expected two records.
