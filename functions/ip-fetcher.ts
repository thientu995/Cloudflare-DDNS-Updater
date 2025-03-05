import axios from "axios";

export async function fetchIPAddress(): Promise<string> {
  try {
    const response = await axios.get("https://cloudflare.com/cdn-cgi/trace");
    const data = response.data;

    const ipMatch = data.match(/ip=([\d.]+)/);
    if (ipMatch) {
      return ipMatch[1];
    } else {
      throw new Error("IP address not found in the response");
    }
  } catch (error) {
    throw new Error("Error fetching IP: " + error);
  }
}
