import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (name: string): string => {
  if (typeof window !== 'undefined') {
    // Client-side environment check
    return (
      (import.meta as any).env?.[`VITE_${name}`] ||
      (import.meta as any).env?.[`NEXT_PUBLIC_${name}`] ||
      (window as any)?.__ENV__?.[name] ||
      ''
    );
  }
  // Server-side / build-time environment check
  return (
    process.env[`VITE_${name}`] ||
    process.env[`NEXT_PUBLIC_${name}`] ||
    ''
  );
};

const supabaseUrl = getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY');

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
