const API_URL = "https://f1-motorsport-data.p.rapidapi.com";
const xRapidapiKey = "a57c1eaf25mshea7a30f7254c13fp18d046jsn784d58cc5a74";

export const standingsDrivers = async (queryParams) => {
  const url = new URL(`${API_URL}/standings-drivers`);
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": xRapidapiKey,
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
export const standingsControllers = async (queryParams) => {
  const url = new URL(`${API_URL}/standings-controllers`);
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": xRapidapiKey,
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
