
// CIS 3610 Midterm - Appointment Booking API
// POST /api/bookings
// Creates booking requests for approved services.

const emailPattern =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function validDate(value: unknown): value is string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return error("Database is not configured", 503);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return error("Invalid JSON body", 400);
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return error("Expected a JSON object", 400);
  }

  const input = body as Record<string, unknown>;

  // Reject unexpected fields, including IDs and timestamps.
  const allowedFields = [
    "service_id",
    "client_email",
    "requested_date",
    "notes",
  ];

  if (
    Object.keys(input).some(
      (field) => !allowedFields.includes(field)
    )
  ) {
    return error("Unexpected input field", 400);
  }

  if (
    typeof input.service_id !== "string" ||
    !uuidPattern.test(input.service_id)
  ) {
    return error("Invalid service ID", 400);
  }

  if (
    typeof input.client_email !== "string" ||
    input.client_email.length > 254 ||
    !emailPattern.test(input.client_email)
  ) {
    return error("Invalid client email", 400);
  }

  if (!validDate(input.requested_date)) {
    return error("Invalid requested date", 400);
  }

  if (
    typeof input.notes !== "string" ||
    input.notes.trim().length < 10 ||
    input.notes.trim().length > 1000
  ) {
    return error(
      "Notes must be between 10 and 1000 characters",
      400
    );
  }

  const booking = {
    service_id: input.service_id,
    client_email: input.client_email.trim(),
    requested_date: input.requested_date,
    notes: input.notes.trim(),
  };

  try {
    const result = await fetch(
      `${url}/rest/v1/bookings`,
      {
        method: "POST",
        headers: {
          apikey: key,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(booking),
        cache: "no-store",
      }
    );

    if (!result.ok) {
      if (
        result.status === 401 ||
        result.status === 403
      ) {
        return error("Booking is not permitted", 403);
      }

      return error(
        "Unable to create booking",
        result.status >= 500 ? 502 : 400
      );
    }

    return Response.json(
      { message: "Booking request submitted" },
      { status: 201 }
    );
  } catch {
    return error("Database request failed", 502);
  }
}
