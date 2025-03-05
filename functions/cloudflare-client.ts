import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";
const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL || "";

const cloudflareHeaders = {
  "x-auth-email": CLOUDFLARE_EMAIL,
  "x-auth-key": CLOUDFLARE_API_TOKEN,
  "content-type": "application/json",
};

export async function fetchZones(): Promise<any[]> {
  try {
    const response = await axios.get(
      "https://api.cloudflare.com/client/v4/zones",
      {
        headers: cloudflareHeaders,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching zones:", error);
    throw new Error("Failed to fetch zones");
  }
}

export async function fetchDNSRecords(zoneId: string) {
  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      {
        headers: cloudflareHeaders,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching DNS records for zone ${zoneId}:`, error);
    throw new Error("Failed to fetch DNS records");
  }
}

export async function updateDNSRecord(
  zoneId: string,
  dnsRecordId: string,
  newIP: string
) {
  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${dnsRecordId}`;

  const data = {
    content: newIP,
  };

  try {
    const response = await axios.patch(url, data, {
      headers: cloudflareHeaders,
    });

    if (response.data.success) {
      console.log(`DNS record updated successfully: ${newIP}`);
    } else {
      console.error("Failed to update DNS record:", response.data.errors);
    }
  } catch (error) {
    console.error("Error updating DNS record:", error);
    throw new Error("Failed to update DNS record");
  }
}
