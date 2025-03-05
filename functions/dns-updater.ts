import { fetchIPAddress } from "./ip-fetcher";
import {
  fetchZones,
  fetchDNSRecords,
  updateDNSRecord,
} from "./cloudflare-client";
import { sleep } from "bun";

export async function updateDNSRecordsForAllZones() {
  try {
    console.log("-------------\nStart Update DNS");
    const ip = await fetchIPAddress();
    const zones = await fetchZones();

    for (const zone of zones) {
      const dnsRecords = await fetchDNSRecords(zone.id);

      for (const record of dnsRecords) {
        if (record.type === "A" && record?.content !== ip) {
          console.log(
            `  DNS Record: ${record.name} (${record.type}) - ${record.content}`
          );
          await updateDNSRecord(zone.id, record.id, ip);
          await sleep(50);
        }
      }
    }
  } catch (error) {
    console.log("Update DNS Failed: ", error);
  }
}
