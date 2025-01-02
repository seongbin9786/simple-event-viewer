import dayjs from "dayjs";

import { applyTimeZone } from "./applyTimezone";

const createStartOfToday = () => dayjs().startOf("day").toDate();

export const createRangeByDays = (days: number, timeZone?: string) => {
  const now = dayjs();
  return {
    from: applyTimeZone(createStartOfToday(), timeZone),
    to: applyTimeZone(
      now
        .subtract(days + 1, "days")
        .startOf("day")
        .toDate(),
      timeZone,
    ),
  };
};

export const createRangeByMonths = (months: number, timeZone?: string) => {
  const now = dayjs();
  return {
    from: applyTimeZone(createStartOfToday(), timeZone),
    to: applyTimeZone(
      now.subtract(months, "month").subtract(1, "days").startOf("day").toDate(),
      timeZone,
    ),
  };
};
