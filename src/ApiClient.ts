import { Measurement } from "./MeasurementInterface";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api";

// Get the password from session storage (set during login)
const getPassword = (): string => {
  const password = sessionStorage.getItem("housemeter_password");
  if (!password) {
    console.error("No password found in session storage");
    throw new Error("Not authenticated. Please log in.");
  }
  console.log("Password retrieved from session storage");
  return password;
};

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const password = getPassword();

    console.log(`Making API call to: ${API_BASE_URL}${endpoint}`);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": password,
        ...options.headers,
      },
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", errorData);
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}

export async function addMeasurements(measurement: Measurement): Promise<void> {
  await apiCall("/measurements", {
    method: "POST",
    body: JSON.stringify({
      id: measurement.id,
      date: measurement.date,
      value: measurement.value,
      type: measurement.type,
    }),
  });
}

export async function deleteMeasurements(
  measurement: Measurement
): Promise<Measurement> {
  await apiCall(`/measurements/${measurement.id}`, {
    method: "DELETE",
  });

  return measurement;
}

export async function getMeasurements(): Promise<Measurement[]> {
  const data = await apiCall("/measurements");

  return data.map((item: any) => ({
    id: item.id,
    date: new Date(item.date),
    value: item.value,
    type: item.type,
  }));
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiCall("/health");
    return true;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}

export function isAuthenticated(): boolean {
  const password = sessionStorage.getItem("housemeter_password");
  return !!password;
}

export function getStoredPassword(): string | null {
  return sessionStorage.getItem("housemeter_password");
}
