import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);

export async function addReading(measurement) {
  const { error } = await supabase
    .from("reading")
    .insert([measurement])
    .select("*");
  if (error) return <div>failed to load data</div>;
}

export async function deleteData(reading) {
  const { error } = await supabase
    .from("reading")
    .delete()
    .match({ id: reading.id });

  if (error) return <div>failed delete data</div>;
}

export async function getReadings() {
  const { data, error } = await supabase.from("reading").select("*");
  if (error) return <div>failed get data</div>;
  return data;
}
