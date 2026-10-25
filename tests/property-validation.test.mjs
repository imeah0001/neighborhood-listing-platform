import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateProperty } from "./validate-contracts.mjs";

const property = JSON.parse(
  readFileSync(new URL("./valid-property.json", import.meta.url), "utf8")
);

test("Valid property is accepted", () => {
  assert.equal(validateProperty(structuredClone(property)), true);
});

test("Missing property ID is rejected", () => {
  const invalid = structuredClone(property);
  delete invalid.property_id;
  assert.equal(validateProperty(invalid), false);
});

test("Negative price is rejected", () => {
  const invalid = structuredClone(property);
  invalid.price = -500;
  assert.equal(validateProperty(invalid), false);
});

test("Malformed ZIP code is rejected", () => {
  const invalid = structuredClone(property);
  invalid.zip_code = "ABC12";
  assert.equal(validateProperty(invalid), false);
});

test("Unexpected property field is rejected", () => {
  const invalid = structuredClone(property);
  invalid.unknown_field = "not allowed";
  assert.equal(validateProperty(invalid), false);
});
