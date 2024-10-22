const API_URL = "https://api.openf1.org";

export const driversInfo = async (queryParams) => {
  const url = new URL(`${API_URL}/v1/drivers`);
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // "x-rapidapi-key": xRapidapiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
