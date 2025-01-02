export const formatDate = (
  timestamp: bigint | Date | undefined,
  timeZone: string | undefined,
) => {
  if (!timestamp || !timeZone) {
    return "-";
  }
  const date =
    timestamp instanceof Date ? timestamp : new Date(Number(timestamp) * 1000);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
};
