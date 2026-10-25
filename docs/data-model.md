# Lab 3 — Neighborhood Listing Platform Data Model

## 1. Property

Primary key: property_id

Required information:
- property_id: unique listing identifier
- title: property display name
- street_address, city, state, zip_code: location
- price: listing price in USD
- bedrooms, bathrooms, square_feet: property facts
- property_type: category of property
- amenities: list of property features
- image_url, image_alt: listing photograph and description
- listing_url: link to more information
- local_sponsors: sponsor IDs associated with this property

The property card displays the image, price, title,
address, facts, and listing link.

The property detail page can also display amenities
and associated local sponsors.

## 2. Sponsor

Primary key: sponsor_id

Required information:
- sponsor_id: unique sponsor identifier
- name: business name
- headline: promotional description
- image_url: sponsor image or logo
- alt_text: image alternative text
- website_url: business website

The SponsorBanner displays this information with
a visible Sponsored disclosure.

## 3. PropertySponsor

Relationship: many-to-many

Composite key: property_id + sponsor_id

Each relationship connects one property to one sponsor.
Both IDs reference existing records.

A property may have multiple sponsors, and one sponsor
may appear with multiple properties.

The local_sponsors field in generated property JSON
will contain sponsor ID references, not duplicate
sponsor business records.

## 4. Voice Response

A voice response can use validated property title,
address, price, bedrooms, bathrooms, square footage,
and amenities.

The application must not invent missing property facts.

## 5. Validation Decisions

- IDs and required text must not be empty.
- Prices and measurements must not be negative.
- Bedrooms must be a nonnegative integer.
- ZIP codes must contain exactly five digits.
- Property types and amenities use controlled values.
- Unknown fields will be rejected.
- Sponsor references must correspond to known sponsors.
- Generated listings are fictional demonstration data.

## 6. Existing Week 2 Component Mapping

The new data contract will be adapted to the existing
PropertyCard interface:

- property_id -> id
- street_address -> address
- square_feet -> sqft
- image_url -> imageUrl
- image_alt -> imageAlt
- listing_url -> listingUrl

Only validated records may reach the UI components.
