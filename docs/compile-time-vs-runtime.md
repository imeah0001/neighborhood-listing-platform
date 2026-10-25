# Lab 3: Compile-Time vs. Runtime Validation Audit

Date: October 25, 2026

## 1. TypeScript Compile-Time Checking

The existing Property interface in src/types/index.ts
declares fields such as:

- price: number
- bedrooms: number
- sqft: number
- imageUrl: string

TypeScript checks code against these types during development
and compilation.

However, TypeScript types are removed when JavaScript runs.
An external JSON file is not automatically guaranteed to
follow the TypeScript interface.

## 2. Runtime Risks

PropertyCard.tsx formats property prices using:

property.price.toLocaleString("en-US", {
  style: "currency",
  currency: "USD"
});

If price is missing at runtime, accessing toLocaleString
on undefined can cause a TypeError.

If price is a string instead of a number, the display may
be incorrect even when the application does not crash.

TypeScript alone cannot prevent these problems when
untrusted JSON is treated as a Property.

## 3. Ajv Runtime Validation

The application validates generated JSON with Ajv before
converting records into the Property interface.

JSON Schema rejects:

- Missing required fields
- A string where price should be a number
- Negative prices
- Invalid five-digit ZIP codes
- Unsupported property types
- Unexpected extra fields

Invalid records are excluded from the rendered listings.

## 4. Contract Comparison

Example: price = "1250000"

TypeScript:
A directly typed assignment would be rejected, but a
TypeScript assertion or unchecked external JSON could still
allow this value to reach runtime.

Ajv:
Rejects the record because price must be a number.

Example: price = -500

TypeScript:
Accepts -500 as a number.

Ajv:
Rejects -500 because the schema requires price >= 0.

Example: zip_code = "ABC12"

TypeScript:
Accepts the value as a string.

Ajv:
Rejects it because the schema requires five digits.

## 5. Verified Results

- Five property-validation tests passed.
- Seven AI-generated-property tests passed.
- All five generated listings passed Ajv validation.
- Next.js TypeScript compilation succeeded.
- ESLint and the production build passed.
- The website displayed five generated properties.
- Filtering for House displayed two matching properties.

## 6. Conclusion

TypeScript helps prevent mistakes in application code.
Ajv protects the application from invalid external JSON.

Both are necessary because compile-time types do not
replace runtime data validation.

JSON Schema also cannot prove that an image or listing URL
exists. The application uses a local image placeholder for
fictional example.org image links.
