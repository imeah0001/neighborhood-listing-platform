import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateProperty } from "./validate-contracts.mjs";

const data = JSON.parse(
  readFileSync(
    new URL("../data/generated/properties-ai-studio.json", import.meta.url),
    "utf8"
  )
);

const listings = data.listings;

test("AI Studio generated exactly five properties", () => {
  assert.equal(listings.length, 5);
});

for (const property of listings) {
  test(`${property.property_id} passes JSON Schema validation`, () => {
    assert.equal(
      validateProperty(property),
      true,
      JSON.stringify(validateProperty.errors)
    );
  });
}

test("All generated property IDs are unique", () => {
  const ids = listings.map((property) => property.property_id);
  assert.equal(new Set(ids).size, ids.length);
});
