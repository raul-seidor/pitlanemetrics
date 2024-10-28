const API_URL = "https://f1-motorsport-data.p.rapidapi.com";
const xRapidapiKey = "a57c1eaf25mshea7a30f7254c13fp18d046jsn784d58cc5a74";

/**
 * Fetches driver standings data from the F1 Motorsport API.
 *
 * This function sends a GET request to the standings-drivers endpoint
 * of the F1 Motorsport API, using the provided query parameters.
 * The x-rapidapi-key is included in the request headers for authentication.
 * If the response is successful, it returns the parsed JSON data.
 * If the response is not successful, it throws an error with the status text.
 *
 * @param {Object} queryParams - An object containing query parameters for the request.
 * @returns {Promise<Object>} A promise that resolves to the driver standings data.
 * @throws Will throw an error if the network request fails or the response is not ok.
 */
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
/**
 * Fetches controller standings data from the F1 Motorsport API.
 *
 * This function sends a GET request to the standings-controllers endpoint
 * of the F1 Motorsport API, using the provided query parameters.
 * The x-rapidapi-key is included in the request headers for authentication.
 * If the response is successful, it returns the parsed JSON data.
 * If the response is not successful, it throws an error with the status text.
 *
 * @param {Object} queryParams - An object containing query parameters for the request.
 * @returns {Promise<Object>} A promise that resolves to the controller standings data.
 * @throws Will throw an error if the network request fails or the response is not ok.
 */
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
