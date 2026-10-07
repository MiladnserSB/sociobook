const BASE_URL = "http://localhost:3000/";

export const request = async (endpoint = "", method = "GET", data) => {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
    // console.log(response);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    // console.log(result);

    return result;
  } catch (error) {
    console.error("Server Error", error);
  }
};
