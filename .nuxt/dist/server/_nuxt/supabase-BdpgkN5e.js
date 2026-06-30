import { createClient } from "@supabase/supabase-js";
const getEnvVar = (name) => {
  return process.env[`VITE_${name}`] || process.env[`NEXT_PUBLIC_${name}`] || "";
};
const supabaseUrl = getEnvVar("SUPABASE_URL");
const supabaseAnonKey = getEnvVar("SUPABASE_ANON_KEY");
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
export {
  hasSupabaseConfig as h,
  supabase as s
};
//# sourceMappingURL=supabase-BdpgkN5e.js.map
