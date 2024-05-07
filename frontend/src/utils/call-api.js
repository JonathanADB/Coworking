const API_HOST = import.meta.env.VITE_API_HOST;

export async function callAPI({ endpoint, method, payload }) {
  try {
    const isSendingData = !!payload;
    const isSendingFiles = payload instanceof FormData;

    const options = {
      method: method,
      headers: {
        Authorization: localStorage.getItem("AUTH_TOKEN") ?? undefined,
        ...(isSendingData &&
          !isSendingFiles && { "Content-Type": "application/json" }),
      },
      body:
        isSendingData && !isSendingFiles ? JSON.stringify(payload) : payload,
    };

    console.log("Calling API", { endpoint, options });

    const response = await fetch(`${API_HOST}${endpoint}`, options);
    return await response.json();
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
}