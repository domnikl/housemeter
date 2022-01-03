import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);
