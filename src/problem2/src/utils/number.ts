export function parseNumberFromString(value: string): number {
  return Number(value.replace(/\./g, "").replace(/,/g, "."));
}

export function formatNumberToLocaleString(value: number): string {
  if (value === 0) return "";

  const [intPart, decPart = ""] = value.toString().split(".");

  if (decPart === "") return intPart;
  return `${intPart},${decPart}`;
}
