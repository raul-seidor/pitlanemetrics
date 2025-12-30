const API_URL = "https://api.openf1.org";

/**
 * Fetches a list of drivers matching the provided query parameters.
 *
 * @param {Object<string, string>} queryParams - The query parameters to apply
 * @returns {Promise<Object>} - The response as a JSON object
 */
export const driversInfo = async (queryParams, options = {}) => {
  const url = new URL(`${API_URL}/v1/drivers`);
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
