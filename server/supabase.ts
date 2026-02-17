import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
  console.warn(
    "WARNING: SUPABASE_URL is not set or invalid. API routes will fail."
  );
}

export const supabase =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
