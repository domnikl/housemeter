import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);
export async function addReading(measurement) {
  const { error } = await supabase.from("readings").insert([measurement]);
  return error;
}

export async function getReadings() {
  const { data } = await supabase.from("readings").select("*");
  return data;
}

export async function deleteData(reading) {
  const { error } = await supabase
    .from("readings")
    .delete()
    .match({ id: reading.id });
  return error;
}
