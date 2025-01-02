import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const applyTimeZone = (date: string | Date, timeZone?: string) => {
  return dayjs(date).tz(timeZone, true).toDate().toISOString();
};
