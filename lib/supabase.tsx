import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🚨 বিল্ড টাইমে যাতে Vercel ক্র্যাশ না করে, তার জন্য সেফটি চেক
const isReady =
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http");

export const supabase = isReady
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null; // ভ্যালু না থাকলে এরর না দিয়ে জাস্ট null ফেরত দেবে
