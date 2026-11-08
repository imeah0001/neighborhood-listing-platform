
// CIS 3610 Midterm - Merchant Services API
// Server-side Next.js route; no service-role credentials used.

type Config = {
  url: string;
  key: string;
};

function getConfig(): Config | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return {
    url: url.replace(/\/+$/, ""),
    key,
  };
}

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

// GET /api/services
// Anonymous visitors can see approved listings only.
export async function GET() {
  const config = getConfig();

  if (!config) {
    return error("Database is not configured", 503);
  }

  try {
    const query = new URLSearchParams({
      select:
        "id,title,hourly_rate,duration_minutes,coverage_radius_miles,created_at",
      status: "eq.approved",
      order: "created_at.desc",
      limit: "50",
    });

    const result = await fetch(
      `${config.url}/rest/v1/services?${query}`,
      {
        headers: {
          apikey: config.key,
        },
        cache: "no-store",
      }
    );

    if (!result.ok) {
      return error("Unable to load services", 502);
    }

    const services = await result.json();

    return Response.json(
      { services },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return error("Database request failed", 502);
  }
}

// POST /api/services
// Authenticated providers can submit their own drafts.
export async function POST(request: Request) {
  const config = getConfig();

  if (!config) {
    return error("Database is not configured", 503);
  }

  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer (.+)$/i);

  if (!match) {
    return error("Authentication required", 401);
  }

  const token = match[1];

  try {
    // Verify the signed-in user with Supabase Auth.
    const authResult = await fetch(
      `${config.url}/auth/v1/user`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!authResult.ok) {
      return error("Invalid authentication", 401);
    }

    const user: unknown = await authResult.json();

    if (
      !user ||
      typeof user !== "object" ||
      !("id" in user) ||
      typeof user.id !== "string"
    ) {
      return error("Invalid authentication", 401);
    }

    // Validate submitted JSON.
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

    const data = body as Record<string, unknown>;

    const allowedFields = [
      "title",
      "hourly_rate",
      "duration_minutes",
      "coverage_radius_miles",
    ];

    if (
      Object.keys(data).some(
        (field) => !allowedFields.includes(field)
      )
    ) {
      return error("Unexpected input field", 400);
    }

    if (
      typeof data.title !== "string" ||
      data.title.trim().length < 5 ||
      data.title.trim().length > 120
    ) {
      return error("Invalid service title", 400);
    }

    if (
      typeof data.hourly_rate !== "number" ||
      !Number.isFinite(data.hourly_rate) ||
      data.hourly_rate < 0 ||
      data.hourly_rate > 10000
    ) {
      return error("Invalid hourly rate", 400);
    }

    if (
      typeof data.duration_minutes !== "number" ||
      !Number.isInteger(data.duration_minutes) ||
      data.duration_minutes < 15 ||
      data.duration_minutes > 1440
    ) {
      return error("Invalid duration", 400);
    }

    if (
      typeof data.coverage_radius_miles !== "number" ||
      !Number.isInteger(data.coverage_radius_miles) ||
      data.coverage_radius_miles < 1 ||
      data.coverage_radius_miles > 500
    ) {
      return error("Invalid coverage radius", 400);
    }

    // Do not trust provider_id or status from the client.
    const service = {
      provider_id: user.id,
      title: data.title.trim(),
      hourly_rate: data.hourly_rate,
      duration_minutes: data.duration_minutes,
      coverage_radius_miles: data.coverage_radius_miles,
      status: "draft",
    };

    // Use the user's JWT so database RLS is enforced.
    const result = await fetch(
      `${config.url}/rest/v1/services?select=id,title,status,provider_id`,
      {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(service),
        cache: "no-store",
      }
    );

    if (!result.ok) {
      if (result.status === 401 || result.status === 403) {
        return error("Not authorized to create service", 403);
      }

      return error("Unable to create service", 400);
    }

    const created = await result.json();

    return Response.json(
      { service: created[0] },
      { status: 201 }
    );
  } catch {
    return error("Service request failed", 502);
  }
}
