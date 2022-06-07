import { createClient } from "@supabase/supabase-js";

//TODO: Interface auslagern
interface Measurement {
  date: string | number;
  value: number;
  type: string;
  id: string;
}

export const supabase = createClient(
  "https://burmmhznjahkpzyzltgg.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY ?? ""
);

export async function addMeasurements(measurement: Measurement) {
  let { data, error } = await supabase
    .from("reading")
    .insert([measurement])
    .select("*");

  if (error != null) {
    throw new Error(error.message);
  }
  
  if (data === null) {
    throw new Error("Error, data cant be null");
  }
}

export async function deleteMeasurements(
  measurement: Measurement
): Promise<Measurement> {
  const { error } = await supabase
    .from("reading")
    .delete()
    .match({ id: (await measurement).id });

  if (error != null) {
    throw new Error(error.message);
  }

  return measurement;
}

export async function getMeasurements(): Promise<Measurement[]> {
  let { data, error } = await supabase.from("reading").select("*");

  if (error != null) {
    throw new Error(error.message);
  }

  if (data === null) {
    throw new Error("Error, data can't be null");
  }

  return data;
}
