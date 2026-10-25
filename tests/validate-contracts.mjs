import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";

const schemaDirectory = new URL("../data/schema/", import.meta.url);

function loadSchema(filename) {
  const path = new URL(filename, schemaDirectory);
  return JSON.parse(readFileSync(path, "utf8"));
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true
});

addFormats(ajv);

export const validateProperty = ajv.compile(
  loadSchema("property.schema.json")
);

export const validateSponsor = ajv.compile(
  loadSchema("sponsor.schema.json")
);

export const validatePropertySponsor = ajv.compile(
  loadSchema("property-sponsor.schema.json")
);

console.log("SUCCESS: Property, Sponsor, and PropertySponsor validators compiled.");
