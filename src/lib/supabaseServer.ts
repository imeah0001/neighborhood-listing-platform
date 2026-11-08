import "server-only";

// Server-side Supabase configuration.
// Public API routes use the publishable key with RLS.
export type SupabaseServerConfig = {
  url: string;
  key: string;
};

export function getSupabaseServerConfig(): SupabaseServerConfig | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return {
    url: url.replace(/\/+$/, ""),
    key,
  };
}

// Elevated credentials are reserved for trusted server-side
// administrator operations, never public or browser code.
export function getSupabaseAdminConfig(): SupabaseServerConfig | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return {
    url: url.replace(/\/+$/, ""),
    key,
  };
}
