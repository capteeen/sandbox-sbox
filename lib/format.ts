const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatSbox(value: number) {
  const negative = value < 0;
  const [whole, fraction] = Math.abs(value).toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const body = fraction === "00" ? withCommas : `${withCommas}.${fraction}`;
  return negative ? `-${body}` : body;
}

export function formatQuote(asset: "SOL" | "USDT", value: number) {
  return asset === "SOL" ? value.toFixed(6) : value.toFixed(2);
}

export function formatWhen(iso: string) {
  const date = new Date(iso);
  const month = MONTHS[date.getUTCMonth()];
  const day = date.getUTCDate();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${month} ${day} · ${hours}:${minutes} UTC`;
}

export function formatLogTime(iso: string) {
  return iso.slice(11, 19);
}

export function shortAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}
