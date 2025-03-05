import { schedule } from "node-cron";
import { updateDNSRecordsForAllZones } from "./functions/dns-updater";

schedule("0 * * * * *", updateDNSRecordsForAllZones);
