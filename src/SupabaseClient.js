import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);
export async function addReading(measurement) {
  const { data, error } = await supabase
    .from("housemeter")
    .insert([measurement]);
    console.log(data,error)
}

export async function getReadings() {
  const { data, error } = await supabase.from("housemeter").select("*");
  console.log(error)
  return data;
}

