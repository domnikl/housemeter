import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY
);

export async function addReading(measurement) {
<<<<<<< HEAD
  const { error } = await supabase
    .from("readings")
    .insert([measurement])
    .select("*");
  if (error) console.log(error);
}

export async function deleteData(reading) {
  const { error } = await supabase
    .from("readings")
    .delete()
    .match({ id: reading.id });

  if (error) console.log(error);
=======
  const { data, error } = await supabase.from("readings").insert([measurement]);
  console.log(data, error);
>>>>>>> main
}

export async function getReadings() {
  const { data, error } = await supabase.from("readings").select("*");
<<<<<<< HEAD
  if (error) console.log(error);
=======
  console.log(error);
>>>>>>> main
  return data;
}
