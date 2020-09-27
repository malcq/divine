export function getStringFromQuery(str?: string | string[]): string | undefined {
  if (!str) { return undefined };
  return Array.isArray(str) ? str.join('') : str;
}
